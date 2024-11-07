import { Request, Response } from "express";
import axios from "axios";

// Define las interfaces para la respuesta de la API
interface ApiResponse {
  items: BasicContact[]; // Los contactos están dentro de 'items'
}

interface BasicContact {
  id: string;
  lookupName: string;
  createdTime: string;
  updatedTime: string;
  links: any[];
}

interface AdditionalContactInfo {
  id: number;
  phone?: string;
  email?: string;
  city?: string;
}

interface FullContact extends BasicContact {
  phone?: string;
  email?: string;
  city?: string;
}

const username = "ICXCandidate";
const password = "Welcome2024";
const authHeader =
  "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

// Controlador para obtener los contactos
export const getContacts = async (req: Request, res: Response) => {
  try {
    console.log("Haciendo la solicitud a la API...");
    const queryParams = new URLSearchParams(req.query as Record<string, string>).toString();
    // Solicitar la lista de contactos
    const response1 = await axios.get<ApiResponse>(
      `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts?${queryParams}`,
      {
        headers: { Authorization: authHeader },
      }
    );

    console.log("Respuesta de la API recibida:", response1.data);

    // Los contactos vienen dentro de 'items'
    const contacts = response1.data.items;

    // Aquí no necesitamos hacer múltiples solicitudes; si toda la información que necesitas está en la respuesta de la API,
    // podemos combinar la información adicional directamente en un solo paso.
    const combinedContacts: FullContact[] = contacts.map(contact => ({
      ...contact,  // La información básica del contacto
      phone: undefined,  // Aquí puedes agregar o modificar cualquier propiedad adicional
      email: undefined,
      city: undefined,
    }));

    console.log("Enviando la respuesta al cliente...");
    res.json(combinedContacts);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error en la respuesta:", error.response?.data);
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || "Error al obtener los contactos");
    } else {
      console.error("Error general:", error);
      res.status(500).send("Error al obtener los contactos");
    }
  }
};
