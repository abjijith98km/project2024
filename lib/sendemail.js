// utils/sendEmail.js

import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey('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');

// Function to send an email using SendGrid
const sendEmail = async ({ to, from, subject, text, html }) => {
    try {
        const msg = {
            to,
            from,
            subject,
            text,
            html,
        };

        await sgMail.send(msg);
        console.log('Email sent successfully');
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

export default sendEmail;
