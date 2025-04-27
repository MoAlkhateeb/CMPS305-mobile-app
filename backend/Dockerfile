FROM python:3.13-alpine AS builder

ENV POETRY_VERSION=1.8.4

WORKDIR /app

RUN apk add --no-cache curl
RUN curl -sSL https://install.python-poetry.org | python3 -
RUN ln -s /root/.local/bin/poetry /usr/local/bin/poetry

COPY . .

RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi


FROM python:3.13-alpine

WORKDIR /app

COPY --from=builder /app .
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /usr/local/bin/ /usr/local/bin/

EXPOSE 8000

RUN ["python3", "models.py"]

ENTRYPOINT ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8080"]