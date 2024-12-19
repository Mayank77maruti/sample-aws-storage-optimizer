import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";

const kmsClient = new KMSClient({ region: 'ap-south-1' });

export async function encryptData(data: string): Promise<string> {
    const command = new EncryptCommand({
        KeyId: process.env.KMS_KEY_ID,
        Plaintext: Buffer.from(data),
    });
    const response = await kmsClient.send(command);
    if (!response.CiphertextBlob) {
        throw new Error("Encryption failed");
    }
    return response.CiphertextBlob.toString("base64");
}


export async function decryptData(encryptedData: string): Promise<string> {
    const command = new DecryptCommand({
        CiphertextBlob: Buffer.from(encryptedData, "base64"),
    });
    const response = await kmsClient.send(command);
    if (!response.Plaintext) {
        throw new Error("Decryption failed");
    }
    return response.Plaintext.toString();
}