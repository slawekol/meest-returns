-- CreateEnum
CREATE TYPE "RefundPolicy" AS ENUM ('INSTANT_AT_PUDO', 'AFTER_HUB_RECEIPT', 'AFTER_INSPECTION');
CREATE TYPE "ReturnStatus" AS ENUM ('INITIATED', 'DROPPED_OFF', 'IN_TRANSIT', 'AT_HUB', 'SORTED', 'SHIPPED_TO_MERCHANT', 'COMPLETED', 'REJECTED', 'EXPIRED');
CREATE TYPE "ReturnReason" AS ENUM ('WRONG_SIZE', 'NOT_AS_DESCRIBED', 'LOW_QUALITY', 'CHANGED_MIND', 'DAMAGED', 'OTHER');
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'RESERVED', 'RELEASED', 'FAILED', 'CANCELLED');
CREATE TYPE "BagStatus" AS ENUM ('OPEN', 'CLOSED', 'IN_TRANSIT', 'RECEIVED_AT_HUB');
CREATE TYPE "ActorType" AS ENUM ('CONSUMER', 'OPERATOR', 'HUB_STAFF', 'SYSTEM', 'MERCHANT');
CREATE TYPE "PhotoType" AS ENUM ('AT_PUDO', 'AT_HUB');
CREATE TYPE "RefundProcessStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');
CREATE TYPE "RefundMethod" AS ENUM ('CARD', 'BANK_TRANSFER', 'STORE_CREDIT');
CREATE TYPE "DepositTransactionType" AS ENUM ('TOPUP', 'RESERVATION', 'RELEASE', 'REFUND_PAYOUT', 'FEE');
CREATE TYPE "WebhookDeliveryStatus" AS ENUM ('PENDING', 'DELIVERED', 'FAILED', 'RETRYING');
CREATE TYPE "ShipmentDestinationType" AS ENUM ('HUB_DEBICA', 'MERCHANT');
CREATE TYPE "ShipmentStatus" AS ENUM ('SCHEDULED', 'IN_TRANSIT', 'DELIVERED');
CREATE TYPE "HubOperatorRole" AS ENUM ('OPERATOR', 'SUPERVISOR');

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "webhookUrl" TEXT,
    "depositBalance" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "depositMinimum" DECIMAL(14,2) NOT NULL DEFAULT 5000,
    "refundPolicy" "RefundPolicy" NOT NULL DEFAULT 'AFTER_HUB_RECEIPT',
    "autoApproveThreshold" DECIMAL(12,2) NOT NULL DEFAULT 500,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Consumer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "score" DECIMAL(3,2) NOT NULL DEFAULT 4.0,
    "returnsCount" INTEGER NOT NULL DEFAULT 0,
    "rejectionsCount" INTEGER NOT NULL DEFAULT 0,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PudoPoint" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "openingHours" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "currentBagId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PudoPoint_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PudoOperator" (
    "id" TEXT NOT NULL,
    "pudoPointId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pinHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3),
    CONSTRAINT "PudoOperator_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Return" (
    "id" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "merchantOrderId" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "pudoPointId" TEXT NOT NULL,
    "bagId" TEXT,
    "status" "ReturnStatus" NOT NULL DEFAULT 'INITIATED',
    "reason" "ReturnReason" NOT NULL,
    "reasonComment" TEXT,
    "refundAmount" DECIMAL(12,2) NOT NULL,
    "refundCurrency" TEXT NOT NULL DEFAULT 'PLN',
    "refundStatus" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "qrToken" TEXT NOT NULL,
    "qrExpiresAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '14 days',
    "productSnapshot" JSONB NOT NULL,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "droppedOffAt" TIMESTAMP(3),
    "receivedAtHubAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "Return_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Bag" (
    "id" TEXT NOT NULL,
    "bagCode" TEXT NOT NULL,
    "pudoPointId" TEXT NOT NULL,
    "status" "BagStatus" NOT NULL DEFAULT 'OPEN',
    "capacity" INTEGER NOT NULL DEFAULT 12,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "receivedAtHubAt" TIMESTAMP(3),
    CONSTRAINT "Bag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReturnEvent" (
    "id" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "actorType" "ActorType" NOT NULL,
    "actorId" TEXT,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReturnEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReturnPhoto" (
    "id" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoType" "PhotoType" NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReturnPhoto_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'PLN',
    "status" "RefundProcessStatus" NOT NULL DEFAULT 'PENDING',
    "method" "RefundMethod" NOT NULL,
    "merchantTransactionId" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DepositTransaction" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "type" "DepositTransactionType" NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "balanceAfter" DECIMAL(14,2) NOT NULL,
    "returnId" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DepositTransaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ConsumerScoreEvent" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "scoreChange" DECIMAL(3,2) NOT NULL,
    "scoreAfter" DECIMAL(3,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "returnId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsumerScoreEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WebhookDelivery" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "returnId" TEXT,
    "url" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "responseStatus" INTEGER,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "lastAttemptAt" TIMESTAMP(3),
    "status" "WebhookDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WebhookDelivery_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "shipmentCode" TEXT NOT NULL,
    "originPudoPointId" TEXT NOT NULL,
    "destinationType" "ShipmentDestinationType" NOT NULL,
    "destinationMerchantId" TEXT,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "departedAt" TIMESTAMP(3),
    "arrivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HubOperator" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pinHash" TEXT NOT NULL,
    "role" "HubOperatorRole" NOT NULL DEFAULT 'OPERATOR',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3),
    CONSTRAINT "HubOperator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");
CREATE UNIQUE INDEX "Merchant_apiKey_key" ON "Merchant"("apiKey");
CREATE INDEX "Consumer_email_idx" ON "Consumer"("email");
CREATE UNIQUE INDEX "PudoPoint_code_key" ON "PudoPoint"("code");
CREATE INDEX "PudoOperator_pudoPointId_idx" ON "PudoOperator"("pudoPointId");
CREATE UNIQUE INDEX "Return_returnId_key" ON "Return"("returnId");
CREATE UNIQUE INDEX "Return_qrToken_key" ON "Return"("qrToken");
CREATE INDEX "Return_merchantId_idx" ON "Return"("merchantId");
CREATE INDEX "Return_consumerId_idx" ON "Return"("consumerId");
CREATE INDEX "Return_pudoPointId_idx" ON "Return"("pudoPointId");
CREATE INDEX "Return_bagId_idx" ON "Return"("bagId");
CREATE INDEX "Return_status_idx" ON "Return"("status");
CREATE INDEX "Return_merchantOrderId_idx" ON "Return"("merchantOrderId");
CREATE UNIQUE INDEX "Bag_bagCode_key" ON "Bag"("bagCode");
CREATE INDEX "Bag_pudoPointId_idx" ON "Bag"("pudoPointId");
CREATE INDEX "Bag_status_idx" ON "Bag"("status");
CREATE INDEX "ReturnEvent_returnId_idx" ON "ReturnEvent"("returnId");
CREATE INDEX "ReturnEvent_eventType_idx" ON "ReturnEvent"("eventType");
CREATE INDEX "ReturnPhoto_returnId_idx" ON "ReturnPhoto"("returnId");
CREATE UNIQUE INDEX "Refund_returnId_key" ON "Refund"("returnId");
CREATE INDEX "DepositTransaction_merchantId_idx" ON "DepositTransaction"("merchantId");
CREATE INDEX "DepositTransaction_returnId_idx" ON "DepositTransaction"("returnId");
CREATE INDEX "ConsumerScoreEvent_consumerId_idx" ON "ConsumerScoreEvent"("consumerId");
CREATE INDEX "ConsumerScoreEvent_returnId_idx" ON "ConsumerScoreEvent"("returnId");
CREATE INDEX "WebhookDelivery_merchantId_idx" ON "WebhookDelivery"("merchantId");
CREATE INDEX "WebhookDelivery_returnId_idx" ON "WebhookDelivery"("returnId");
CREATE INDEX "WebhookDelivery_status_idx" ON "WebhookDelivery"("status");
CREATE INDEX "Shipment_originPudoPointId_idx" ON "Shipment"("originPudoPointId");
CREATE INDEX "Shipment_status_idx" ON "Shipment"("status");
CREATE UNIQUE INDEX "HubOperator_email_key" ON "HubOperator"("email");

-- AddForeignKey
ALTER TABLE "PudoOperator" ADD CONSTRAINT "PudoOperator_pudoPointId_fkey" FOREIGN KEY ("pudoPointId") REFERENCES "PudoPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Return" ADD CONSTRAINT "Return_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Return" ADD CONSTRAINT "Return_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Return" ADD CONSTRAINT "Return_pudoPointId_fkey" FOREIGN KEY ("pudoPointId") REFERENCES "PudoPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Return" ADD CONSTRAINT "Return_bagId_fkey" FOREIGN KEY ("bagId") REFERENCES "Bag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Bag" ADD CONSTRAINT "Bag_pudoPointId_fkey" FOREIGN KEY ("pudoPointId") REFERENCES "PudoPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ReturnEvent" ADD CONSTRAINT "ReturnEvent_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReturnPhoto" ADD CONSTRAINT "ReturnPhoto_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DepositTransaction" ADD CONSTRAINT "DepositTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DepositTransaction" ADD CONSTRAINT "DepositTransaction_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ConsumerScoreEvent" ADD CONSTRAINT "ConsumerScoreEvent_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ConsumerScoreEvent" ADD CONSTRAINT "ConsumerScoreEvent_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WebhookDelivery" ADD CONSTRAINT "WebhookDelivery_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WebhookDelivery" ADD CONSTRAINT "WebhookDelivery_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_originPudoPointId_fkey" FOREIGN KEY ("originPudoPointId") REFERENCES "PudoPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
