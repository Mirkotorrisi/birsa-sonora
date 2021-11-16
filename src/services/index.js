import axios from "axios";

export const requestSendMessage = async ({ input, contact }) => {
  try {
    await axios.post(
      "https://f68a6169ab34ac4b4169f12776c611bc.m.pipedream.net",
      {
        input,
        contact,
      }
    );
    return "Grazie per averci contattato. Ti risponderemo a breve per fissare la lezione di prova!";
  } catch (error) {
    return "Siamo spiacenti, qualcosa è andato storto nell'elaborare la richiesta. Prova a chiamarci o a contattarci via mail.";
  }
};
