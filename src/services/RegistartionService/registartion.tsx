import RegistrationApi from 'api/RegistrationApi/RegistrationApi';
import {ApiResponseModel} from 'src/model/apiResponseModel';

class RegistrationService {
  static async createParentRegistration(
    registrationData: any,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.createParentRegistration(
        registrationData,
      );
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error creating registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async createChildRegistration(
    registrationData: any,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.createChildRegistration(
        registrationData,
      );
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error creating registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async getRegistration(
    registrationId: string,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.getRegistration(registrationId);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async getRegisterdUserData(userId: string): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.getRegisterdUserData(userId);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }


  static async startSubscription(
    payloadData: string,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.startSubscription(payloadData);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async getAllSchools(): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.getAllSchools();
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async updateRegistration(
    registrationId: string,
    registrationData: any,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.updateRegistration(
        registrationId,
        registrationData,
      );
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error updating registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async deleteRegistration(
    registrationId: string,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.deleteRegistration(registrationId);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error deleting registration',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async getAllRegistrations(
    path: string,
    userId: string,
  ): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.getAllRegistrations(path, userId);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching all registrations',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  static async savePlans(path: string): Promise<ApiResponseModel> {
    try {
      const response = await RegistrationApi.savePlansDetails(path);
      return response.data as ApiResponseModel;
    } catch (error: any) {
      return {
        success: false,
        message: 'Error fetching all registrations',
        data: null,
        error: this.handleApiError(error),
      };
    }
  }

  private static handleApiError(error: any): string {
    if (error.response) {
      return `Error: ${
        error.response.data?.message || 'An unexpected error occurred'
      }`;
    } else if (error.request) {
      return 'No response from server';
    } else {
      return `Error: ${error.message}`;
    }
  }
}

export default RegistrationService;
