class Service {
  baseUrl = 'https://blog.kata.academy/api/';
  async getArticles() {
    const res = fetch(`${this.baseUrl}articles`).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}article`}, response status ${res.status}`);
      }
      return res.json();
    });
    return res;
  }
  async getArticleBySlug(slug) {
    const res = fetch(`${this.baseUrl}articles/${slug}`).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}article`}, response status ${res.status}`);
      }
      return res.json();
    });
    return res;
  }
}
const service = new Service();
export default service;
