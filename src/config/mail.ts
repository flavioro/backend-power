interface IMailConfig {
  driver: 'ethereal' | 'socketlabs';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
