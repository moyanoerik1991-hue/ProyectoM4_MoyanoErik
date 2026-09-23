import { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

interface UpcomingTask {
    title: string;
    deadline: string;
}

interface SummaryRequestBody {
    email: string;
    completedCount: number;
    pendingCount: number;
    upcoming: UpcomingTask[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido." });
    }

    const { email, completedCount, pendingCount, upcoming } = req.body as SummaryRequestBody;

    if (!email) {
        return res.status(400).json({ error: "Falta el email de destino." });
    }

    const upcomingHtml = upcoming.length
        ? upcoming
            .map((task) => `<li>${task.title} — vence: ${task.deadline}</li>`)
            .join("")
        : "<li>No tenés tareas próximas a vencer.</li>";

    const htmlBody = `
        <h2>Resumen de tus tareas</h2>
        <p>Tareas completadas: <strong>${completedCount}</strong></p>
        <p>Tareas pendientes: <strong>${pendingCount}</strong></p>
        <h3>Próximas a vencer</h3>
        <ul>${upcomingHtml}</ul>
        <p>¿Querés ver el detalle completo? Ingresá a la app para gestionar tus tareas.</p>
    `;

    const command = new SendEmailCommand({
        Source: process.env.AWS_SES_FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
            Subject: { Data: "Resumen de tus tareas" },
            Body: { Html: { Data: htmlBody } },
        },
    });

    try {
        await sesClient.send(command);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error al enviar email:", err);
        return res.status(500).json({ error: "No se pudo enviar el email." });
    }
}