-- CreateTable
CREATE TABLE "business" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255),
    "image" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_detail" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "business_id" UUID,
    "financial_data" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_status" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "business_id" UUID,
    "status_data" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_application" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "business_id" UUID,
    "user_id" UUID,
    "application_data" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loan_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_detail" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "business_id" UUID,
    "loan_data" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loan_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_detail" ADD CONSTRAINT "financial_detail_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_status" ADD CONSTRAINT "financial_status_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan_application" ADD CONSTRAINT "loan_application_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan_application" ADD CONSTRAINT "loan_application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan_detail" ADD CONSTRAINT "loan_detail_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

