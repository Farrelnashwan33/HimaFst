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
   * Submit registration data.
   * Currently mocked to simulate API call.
   * Ready to be connected to Supabase/PostgreSQL/MySQL.
   */
  static async submitRegistration(data: RegistrationData): Promise<{ success: boolean; message?: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Basic validation check to simulate backend validation
      if (!data.fullName || !data.nim || !data.whatsapp || !data.email) {
        throw new Error("Missing required fields");
      }
      
      if (!data.dataConsent) {
        throw new Error("Must consent to data usage");
      }
      
      // In the future, this is where you'd call fetch('/api/register', ...) 
      // or use Supabase client: supabase.from('registrations').insert([data])
      console.log('Registration submitted:', data);
      
      return { success: true };
    } catch (error: any) {
      console.error('Registration failed:', error);
      return { success: false, message: error.message || 'Terjadi kesalahan saat mendaftar' };
    }
  }
}
