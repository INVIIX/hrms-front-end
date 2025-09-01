import apiClient from "@/lib/apiClient";

// Type sesuai response API
export type EnumItem = {
  value: string | number | boolean;
  label: string;
};

class EnumClass {
  private cache: Record<string, EnumItem[]> = {};

  // ambil list dari API berdasarkan endpoint
  async getList(endpoint: string): Promise<EnumItem[]> {
    if (this.cache[endpoint]) {
      return this.cache[endpoint];
    }

    const response = await apiClient.get(endpoint);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch enum from ${endpoint}`);
    }

    // ambil data sesuai struktur response
    const data: EnumItem[] = response.data.data;

    this.cache[endpoint] = data;
    return data;
  }

  // ambil satu item berdasarkan value
  async getByValue(endpoint: string, value: string | number): Promise<EnumItem | undefined> {
    const list = await this.getList(endpoint);
    return list.find((item) => item.value === value);
  }

  // hapus cache (untuk refresh)
  clearCache(endpoint?: string) {
    if (endpoint) {
      delete this.cache[endpoint];
    } else {
      this.cache = {};
    }
  }
}

const enumClass = new EnumClass();
export default enumClass;
