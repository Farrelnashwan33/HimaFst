export interface RegistrationData {
  fullName: string;
  nim: string;
  studyProgram: string;
  semester: string;
  whatsapp: string;
  email: string;
  division: string;
  reason: string;
  experience: string;
  dataConsent: boolean;
}

export class RegistrationService {
  /**
   * Submit registration data to backend API.
   */
  static async submitRegistration(data: RegistrationData): Promise<{ success: boolean; message?: string }> {
    try {
      if (!data.fullName || !data.nim || !data.whatsapp || !data.email) {
        throw new Error("Semua kolom wajib diisi.");
      }
      
      if (!data.dataConsent) {
        throw new Error("Anda harus menyetujui pernyataan persetujuan data.");
      }
      
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('Registration failed:', error);
      return { success: false, message: error.message || 'Terjadi kesalahan saat mendaftar' };
    }
  }
}

