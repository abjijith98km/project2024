// pages/api/sendEmail.js

import sendEmail from "../../../lib/sendemail";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { toEmail, subject, htmlContent } = req.body;

        try {
            const { success, error } = await sendEmail({
                to: toEmail,
                from: 'abhijith@pixelflames.com', // Replace with your verified sender
                subject: subject,
                html: htmlContent,
            });

            if (success) {
                res.status(200).json({ message: 'Email sent successfully' });
            } else {
                res.status(500).json({ error: 'Failed to send email', details: error });
            }
        } catch (error) {
            console.error('Error sending email:', error.message);
            res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
