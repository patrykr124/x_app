import type {User} from "@clerk/nextjs/api";
import {Webhook} from "svix";
import {headers} from "next/headers";

type UnwantedKeys =
    "emailAddresses"
    | "firstName"
    | "lastName"
    | "primaryEmailAddressId"
    | "primaryPhoneNumberId"
    | "phoneNumbers";

interface UserInterface extends Omit<User, UnwantedKeys> {
    email_addresses: {
        email_address: string;
        id: string;
    }[];
    primary_email_address_id: string;
    first_name: string;
    last_name: string;
    primary_phone_number_id: string;
    phone_numbers: {
        phone_number: string;
        id: string;
    }[];
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req) {
    try {
        // Pobieramy payload z żądania
        const payload = await req.json();
        const payloadString = JSON.stringify(payload);

        // Pobieramy nagłówki webhooka
        const headerPayload = headers();
        const svixId = headerPayload.get("svix-id");
        const svixIdTimeStamp = headerPayload.get("svix-timestamp");
        const svixSignature = headerPayload.get("svix-signature");

        // Sprawdzamy, czy wszystkie wymagane nagłówki są obecne
        if (!svixId || !svixIdTimeStamp || !svixSignature) {
            console.error("Brakujące nagłówki webhooka:", {
                svixId,
                svixIdTimeStamp,
                svixSignature,
            });
            return new Response("Brakujące nagłówki webhooka", { status: 400 });
        }

        const svixHeaders = {
            "svix-id": svixId,
            "svix-timestamp": svixIdTimeStamp,
            "svix-signature": svixSignature,
        };

        const wh = new Webhook(webhookSecret);
        let evt: Event | null = null;

        try {
            // Weryfikacja webhooka
            evt = wh.verify(payloadString, svixHeaders) as Event;
        } catch (error) {
            console.error("Błąd podczas weryfikacji webhooka:", error);
            console.error("Payload:", payloadString);
            console.error("Nagłówki:", svixHeaders);
            return new Response("Błąd podczas weryfikacji webhooka", { status: 400 });
        }

        // Przechwytywanie danych z eventu
        const {id} = evt.data;
        const eventType: EventType = evt.type;

        if (eventType === "user.created" || eventType === "user.updated") {
            const {email_addresses, primary_email_address_id} = evt.data;
            const emailObject = email_addresses?.find((email) => {
                return email.id === primary_email_address_id;
            });
            if (!emailObject) {
                console.error("Błąd: nie znaleziono głównego adresu e-mail użytkownika.");
                return new Response("Błąd: nie znaleziono głównego adresu e-mail użytkownika", {
                    status: 400,
                });
            }
            console.log("Przetwarzanie użytkownika:", emailObject.email_address);
        }

        // Logowanie poprawnie przetworzonego eventu
        console.log(`Użytkownik ${id} został ${eventType}`);

        return new Response("Webhook przetworzony pomyślnie", { status: 201 });

    } catch (error) {
        console.error("Ogólny błąd podczas przetwarzania webhooka:", error);
        return new Response("Ogólny błąd", { status: 500 });
    }
}

type Event = {
    data: UserInterface;
    object: "event";
    type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";
