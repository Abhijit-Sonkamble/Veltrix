const nodemailer = require('nodemailer');

const sendRegisterAdminMail = async (email, password) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_USER_PASS,
        }
    });

    const mailOptions = {
        from: `"E-Commerce App" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Admin Access",
        html: `
            <h2>Admin Panel Access</h2>
            <p><b>Email :</b> ${email}</p>
            <p><b>Password :</b> ${password}</p>
            <p><b>Website:</b> <a href='www.jiohotstar.com'>Link</a> </p>
        `,
    };

    await transport.sendMail(mailOptions);
}

const sendOTPMail = async (to, OTP) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_USER_PASS,
        }
    });

    const mailOptions = {
        from: `"E-Commerce App" <${process.env.MAIL_USER}>`,
        to: to,
        subject: "Forgot Password",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>E-Commerce OTP Verification</title>
    <style>
        /* Reset & Base Styles for email clients */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #f2f4f8;
            font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }
        /* Main container */
        .email-container {
            max-width: 560px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
        }
        /* Responsive wrapper */
        .wrapper {
            padding: 32px 28px 40px;
        }
        /* Header section with subtle e-commerce branding */
        .header {
            text-align: center;
            margin-bottom: 32px;
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: inline-block;
        }
        .logo span {
            background: none;
            color: #2c3e50;
        }
        .brand-badge {
            font-size: 13px;
            color: #6c7a89;
            margin-top: 6px;
            letter-spacing: 0.3px;
        }
        /* Hero / OTP card */
        .otp-card {
            background: #f9fafc;
            border-radius: 28px;
            padding: 28px 20px;
            text-align: center;
            margin: 20px 0 28px;
            border: 1px solid #eef2f6;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .otp-label {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #4b6a8b;
            margin-bottom: 16px;
        }
        /* Enhanced OTP styling — replaces inline <b> with professional token */
        .otp-code {
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 8px;
            font-family: 'SF Mono', 'Menlo', 'Courier New', monospace;
            background: white;
            display: inline-block;
            padding: 16px 28px;
            border-radius: 20px;
            color: #1f2e3a;
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #e2e9f0;
            margin: 12px 0 8px;
        }
        .otp-expiry {
            font-size: 13px;
            color: #8a9bb0;
            margin-top: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        .expiry-icon {
            font-size: 14px;
        }
        /* Divider */
        .divider {
            border-top: 1px solid #eef2f8;
            margin: 28px 0 24px;
        }
        /* Message text */
        .message {
            color: #2c3e4e;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 12px;
        }
        .highlight {
            font-weight: 600;
            color: #1f2f3a;
        }
        .warning-note {
            background: #fef7e0;
            border-left: 4px solid #f5a623;
            padding: 14px 18px;
            border-radius: 16px;
            font-size: 13px;
            color: #a26f2a;
            margin: 24px 0 20px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }
        .warning-icon {
            font-size: 18px;
        }
        /* CTA & support */
        .support-link {
            text-align: center;
            margin: 28px 0 12px;
        }
        .support-text {
            font-size: 13px;
            color: #6f7d91;
        }
        .support-text a {
            color: #2c6280;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid #cbdbe0;
        }
        .support-text a:hover {
            color: #1a4b66;
            border-bottom-color: #1a4b66;
        }
        /* Footer */
        .footer {
            background-color: #f7f9fc;
            padding: 20px 28px;
            text-align: center;
            border-top: 1px solid #e9edf2;
            font-size: 12px;
            color: #7e8c9f;
        }
        .footer-links {
            margin-bottom: 12px;
        }
        .footer-links a {
            color: #5b6f88;
            text-decoration: none;
            margin: 0 8px;
            font-size: 12px;
        }
        .footer-links a:hover {
            text-decoration: underline;
            color: #2c6280;
        }
        .copyright {
            font-size: 11px;
            color: #96a4b8;
        }
        /* Button (just for reference, not main CTA but secure account) */
        .btn-ghost {
            display: inline-block;
            background: transparent;
            border: 1px solid #cbdbe2;
            padding: 8px 20px;
            border-radius: 40px;
            font-size: 13px;
            font-weight: 500;
            color: #3a5a78;
            text-decoration: none;
            margin-top: 12px;
            transition: 0.2s;
        }
        /* Responsive */
        @media (max-width: 550px) {
            .wrapper {
                padding: 24px 20px;
            }
            .otp-code {
                font-size: 38px;
                letter-spacing: 6px;
                padding: 12px 20px;
            }
            .logo {
                font-size: 24px;
            }
        }
    </style>
</head>
<body style="margin:0; padding:24px 12px; background-color:#f2f4f8;">
    <!-- Preheader text (hidden but useful for preview) -->
    <div style="display:none; font-size:0; line-height:0; max-height:0; opacity:0;">Your one-time password for secure e-commerce verification — valid for 10 minutes</div>
    
    <div class="email-container" style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:24px; overflow:hidden;">
        <!-- Header with brand personality -->
        <div class="wrapper" style="padding:32px 28px 28px;">
            <div class="header" style="text-align:center; margin-bottom:20px;">
                <div class="logo" style="font-size:28px; font-weight:800; letter-spacing:-0.5px; background:linear-gradient(135deg,#1a2a3a,#2c3e50); -webkit-background-clip:text; background-clip:text; color:transparent;">
                    ⚡ Urban<span style="background:none; color:#2c3e50;">Cart</span>
                </div>
                <div class="brand-badge" style="font-size:13px; color:#6c7a89; margin-top:6px;">Trusted by 50,000+ shoppers</div>
            </div>
            
            <!-- Greeting -->
            <p style="font-size:16px; color:#2c3e50; margin-bottom:8px; font-weight:500;">Hello,</p>
            <p class="message" style="color:#2c3e4e; font-size:16px; line-height:1.5; margin-bottom:12px;">
                You’ve requested to sign in or complete a transaction. Use the secure One-Time Password (OTP) below to verify your identity.
            </p>
            
            <!-- Professional OTP Card (replaces original <p>OTP : <b>${OTP}</b></p> with enhanced design) -->
            <div class="otp-card" style="background:#f9fafc; border-radius:28px; padding:28px 20px; text-align:center; margin:20px 0 28px; border:1px solid #eef2f6;">
                <div class="otp-label" style="font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1.5px; color:#4b6a8b; margin-bottom:16px;">🔐 verification code</div>
                <!-- DYNAMIC OTP INSERTION: replaces inline <b>${OTP}</b> with styled professional display -->
                <div class="otp-code" style="font-size:48px; font-weight:800; letter-spacing:8px; font-family:'SF Mono', 'Menlo', 'Courier New', monospace; background:#ffffff; display:inline-block; padding:16px 28px; border-radius:20px; color:#1f2e3a; box-shadow:0 4px 12px rgba(0,0,0,0.04); border:1px solid #e2e9f0;">
                    ${OTP}
                </div>
                <div class="otp-expiry" style="font-size:13px; color:#8a9bb0; margin-top:18px; display:flex; align-items:center; justify-content:center; gap:6px;">
                    <span class="expiry-icon" style="font-size:14px;">⏱️</span> This code expires in <strong>10 minutes</strong>
                </div>
            </div>
            
            <!-- Security tip & warning -->
            <div class="warning-note" style="background:#fef7e0; border-left:4px solid #f5a623; padding:14px 18px; border-radius:16px; font-size:13px; color:#a26f2a; margin:24px 0 20px; display:flex; gap:12px; align-items:flex-start;">
                <div class="warning-icon" style="font-size:18px;">🛡️</div>
                <div style="flex:1;">For your security, <span class="highlight" style="font-weight:600;">never share this OTP</span> with anyone, including our support team. UrbanCart will never ask for your password or verification code over call or email.</div>
            </div>
            
            <!-- Additional info: transaction context -->
            <p style="font-size:14px; color:#5b6e8a; margin-bottom:8px;">
                If you did not request this code, please 
                <a href="#" style="color:#2c6280; text-decoration:none; border-bottom:1px solid #cbdbe0;">reset your password</a> 
                or contact our support team immediately.
            </p>
            
            <div class="divider" style="border-top:1px solid #eef2f8; margin:28px 0 24px;"></div>
            
            <!-- Optional quick support link & account protection -->
            <div class="support-link" style="text-align:center; margin:8px 0 12px;">
                <a href="#" class="btn-ghost" style="display:inline-block; background:transparent; border:1px solid #cbdbe2; padding:8px 20px; border-radius:40px; font-size:13px; font-weight:500; color:#3a5a78; text-decoration:none;">Manage account security</a>
            </div>
            <div class="support-text" style="font-size:13px; color:#6f7d91; text-align:center;">
                Need help? <a href="mailto:support@urbancart.com" style="color:#2c6280; text-decoration:none; border-bottom:1px solid #cbdbe0;">support@urbancart.com</a> or visit our <a href="#" style="color:#2c6280; text-decoration:none; border-bottom:1px solid #cbdbe0;">Help Center</a>
            </div>
        </div>
        
        <!-- Footer (e-commerce reassurance) -->
        <div class="footer" style="background:#f7f9fc; padding:20px 28px; text-align:center; border-top:1px solid #e9edf2; font-size:12px; color:#7e8c9f;">
            <div class="footer-links" style="margin-bottom:12px;">
                <a href="#" style="color:#5b6f88; text-decoration:none; margin:0 8px;">Privacy Policy</a> 
                <span style="color:#cbd5e1;">•</span>
                <a href="#" style="color:#5b6f88; text-decoration:none; margin:0 8px;">Terms of Service</a>
                <span style="color:#cbd5e1;">•</span>
                <a href="#" style="color:#5b6f88; text-decoration:none; margin:0 8px;">Returns & Refunds</a>
            </div>
            <div class="copyright" style="font-size:11px; color:#96a4b8;">
                © 2025 UrbanCart — Fast & Secure E-Commerce. All rights reserved.<br>
                This is an automated transactional message, please do not reply directly.
            </div>
        </div>
    </div>
</body>
</html>`,
    };

    await transport.sendMail(mailOptions);
}

module.exports = { sendOTPMail, sendRegisterAdminMail };