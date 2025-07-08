const fs = require('fs');
const nodemailer = require('nodemailer');

// === Load and parse ML-generated JSON safely ===
let data;
try {
  const rawData = fs.readFileSync('processed_candidates.json', 'utf-8');
  data = JSON.parse(rawData);
} catch (error) {
  console.error('❌ Failed to load or parse JSON file:', error.message);
  process.exit(1); // Exit the script if data loading fails
}

const companies = data.top_matching_companies || [];

if (companies.length === 0) {
  console.log('⚠️ No matching companies found in the data.');
  process.exit(0);
}

// === Setup Nodemailer transporter ===
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uwuharu796@gmail.com', // your email
    pass: 'eisgxfmsxweczxbx'     // app password
  }
});

// === Email template generator ===
function generateEmailContent(company) {
  return {
    subject: `Candidate Match for ${company.Role} at ${company.Company} (${company.Branch})`,
    html: `
      <p>Dear Team at <strong>${company.Company}</strong>,</p>
      <p>We’ve identified a potential candidate match for your open position of <strong>${company.Role}</strong> at your <strong>${company.Branch}</strong> branch.</p>
      <ul>
        <li><strong>Required Skills:</strong> ${company.Skills}</li>
        <li><strong>Experience Required:</strong> ${company.Experience} years</li>
        <li><strong>Match Score:</strong> ${(company.gte_match_score * 100).toFixed(2)}%</li>
      </ul>
      <p>We believe this candidate aligns well with your needs. Please let us know if you'd like to proceed further.</p>
      <p><em>– Candidate Recommendation Bot 🤖</em></p>
    `
  };
}

// === Send emails to all matched companies ===
companies.forEach(company => {
  const emailContent = generateEmailContent(company);

  const mailOptions = {
    from: 'uwuharu796@gmail.com',
    to: company.Email,
    subject: emailContent.subject,
    html: emailContent.html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`❌ Error sending to ${company.Email}:`, err.message);
    } else {
      console.log(`✅ Email successfully sent to ${company.Email}: ${info.response}`);
    }
  });
});
