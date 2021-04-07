# Cadastro de Usuário

**Requisitos Funcionais**

**Requisitos Não Funcionais**

**Regras de Negócios**

# Recuperação de senha do usuário

**Requisitos Funcionais**

 - O usuário deve poder recuperar sua senha informando o seu e-mail;
 - O usuário deve receber um email com instruções de recuperação de senha;
 - O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

 - Utilizar Mailtrap para testar envios em dev;
 - Utilizar (qual serviço?) para envios em produção;
 - O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negócios**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

**Requisitos Funcionais**

 - O usuário deve poder atualizar seu nome, email e senha,;

**Requisitos Não Funcionais**

 -

**Regras de Negócios**

- O usuário NÃO pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Controle de pagamento pagseguro;

**Requisitos Funcionais**

 - O usuário deve poder cadastrar endereço
 - O usuário deve poder pagar via cartão de crédito;
 - O usuário deve poder pagar via cartão de debito;
 - O usuário deve poder pagar via boleto;

**Requisitos Não Funcionais**

 -

**Regras de Negócios**

-

# Controle de pagamento paypall;


# Cadastro de Projetos;


# Entrega de projetos automatica;


# Lista de contatos, validar email;


# Favoritar projetos que gosta;


# Blog;


# Controle de acesso;


# MarketPlace;

# Tools send email

**SparkPost**
- https://www.sparkpost.com/

**Mailgun**
- https://www.mailgun.com/

**Mailchimp**
- https://mailchimp.com/

**Amazon Simple Email Service**
- https://aws.amazon.com/pt/ses/
 Plano mais barato conforme Diego (Rocketseat)

**socketlabs**
- https://www.socketlabs.com/send-email-nodejs/
- https://cp.socketlabs.com/servers/35011/launch/integrate/libraries
-Injection API Key: Sn2x6AMo95Rkb4LHg7c3
-Server ID: 35011


# Sells(vendas) pela PagSeguro
**Requisitos Funcionais**
  - Informar dados para a venda;
  -

**Requisitos Não Funcionais**

**Regras de Negócios**
