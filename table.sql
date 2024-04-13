CREATE TABLE "models"
(
    id             VARCHAR(255) PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    description    TEXT        NOT NULL,
    context_length INTEGER     NOT NULL,
    modality       VARCHAR(255) NOT NULL,
    tokenizer      VARCHAR(255) NOT NULL
);
