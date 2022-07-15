import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = process.env.EMAIL_BASE_URL;

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: 'Nike-clone 가입 인증 메일',
      html: `
        <h3>가입확인 버튼을 누르시면 가입 인증이 완료됩니다.</h3><br>
        <form action="${url}" method="POST">
          <button class="btn">가입확인</button>
        </form>
      `, // todo: style
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
