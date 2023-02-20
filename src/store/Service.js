class Service {
  baseUrl = 'https://blog.kata.academy/api/';
  async getArticles(skip = 40) {
    const res = fetch(`${this.baseUrl}articles?limit=20&offset=${skip}`).then((res) => {
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
console.log(service.getArticles().then((res) => console.log(res)));
export default service;
