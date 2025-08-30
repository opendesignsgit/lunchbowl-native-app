import httpAxiosClient from '../../config/httpclient';

class RegistrationApi {
  private registrationEndpoint: string;
  private AllSchoolEndpoint: string;
  private startSubs: string;

  constructor() {
    this.registrationEndpoint = '/customer/stepForm-Register';
    this.AllSchoolEndpoint = '/schools/get-all-schools';
    this.startSubs = '/customer/form/';
  }

  async createParentRegistration(registrationData: any) {
    return await httpAxiosClient.post(
      `${this.registrationEndpoint}`,
      registrationData,
    );
  }

  async createChildRegistration(registrationData: any) {
    return await httpAxiosClient.post(
      `${this.registrationEndpoint}`,
      registrationData,
    );
  }

  async savePlansDetails(registrationData: any) {
    return await httpAxiosClient.post(
      `${this.registrationEndpoint}`,
      registrationData,
    );
  }

  async getRegisterdUserData(userId: string) {
    return await httpAxiosClient.get(`${this.startSubs}/${userId}`);
  }
  

  async startSubscription(payloadData: any) {
    return await httpAxiosClient.post(`${this.startSubs}`, payloadData);
  }

  async getAllSchools() {
    return await httpAxiosClient.get(`${this.AllSchoolEndpoint}/`);
  }

  async getRegistration(registrationId: string) {
    return await httpAxiosClient.get(
      `${this.registrationEndpoint}/${registrationId}`,
    );
  }

  async updateRegistration(registrationId: string, registrationData: any) {
    return await httpAxiosClient.put(
      `${this.registrationEndpoint}/${registrationId}`,
      registrationData,
    );
  }

  async deleteRegistration(registrationId: string) {
    return await httpAxiosClient.delete(
      `${this.registrationEndpoint}/${registrationId}`,
    );
  }

  async getAllRegistrations(path: string, userId: string) {
    return await httpAxiosClient.post(`${this.registrationEndpoint}/get-all`, {
      _id: userId,
      path,
    });
  }
}

export default new RegistrationApi();
