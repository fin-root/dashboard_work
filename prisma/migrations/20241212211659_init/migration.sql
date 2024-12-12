-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sheet1__" (
    "id" TEXT NOT NULL,
    "baza" TEXT NOT NULL,
    "kod" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "periodRp" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "sch" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,
    "data_vydachi" TIMESTAMP(3) NOT NULL,
    "data_peredachi" TIMESTAMP(3) NOT NULL,
    "vid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kolvo" INTEGER NOT NULL,
    "otdel" TEXT NOT NULL,
    "e_mail" TEXT NOT NULL,
    "lending" TEXT NOT NULL,
    "period_rp" TEXT NOT NULL,
    "unique_rp" INTEGER NOT NULL,
    "otsutsvuet_rp" TEXT NOT NULL,

    CONSTRAINT "Sheet1___pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
