const emailTemplate = (username, resetLink) => `
   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333;">Hi ${username},</h2>
      <p style="font-size: 16px; color: #555;">
        You recently requested to reset your password. Click the button below to proceed.
      </p>
      <div style="margin: 30px 0;">
        <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; background-color: #2563EB; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        If you didn't request this, you can safely ignore this email. This link will expire in 10 minutes.
      </p>
      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} Tickify. All rights reserved.</p>
    </div>
  </div>
`;

export default emailTemplate;
