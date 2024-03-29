import logging

import python_http_client
import sendgrid
from django.template.loader import get_template

import env

logger = logging.getLogger(__name__)

client = sendgrid.SendGridAPIClient(env.SENDGRID_API_KEY)


class SendGridAPIError(Exception):
    pass


def send_email(to: str, template_name: str, subject: str, context: dict | None = None):
    context = (context or {}) | {"BACKEND_URL": env.BACKEND_URL}
    template = get_template(f"emails/{template_name}.html")
    html = template.render(context)
    email = sendgrid.Mail(
        from_email=(env.FROM_EMAIL, "Replant World"),
        to_emails=[to],
        subject=subject,
        html_content=html,
    )
    try:
        response = client.send(email)
    except (sendgrid.SendGridException, python_http_client.HTTPError) as e:
        logger.error(str(e))
        raise SendGridAPIError(repr(e)) from e
    if response.status_code >= 400:
        logger.error(response.body)
        raise SendGridAPIError(f"Response: {response.status_code}")
