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
  async registrationUser(data) {
    console.log(data);
    const res = fetch(`${this.baseUrl}users`, {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: String(data.username),
          password: String(data.password),
          email: String(data.email),
        },
      }),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}users`}, response status ${res.status}, ${res.message}`);
      }
      return res.json();
    });
    // localStorage.setItem('token', JSON.stringify(res.token));
    // localStorage.setItem('login', JSON.stringify(res.email));
    // localStorage.setItem('password', JSON.stringify(res.password));
    return res;
  }
  async loginUser(token) {
    console.log(token);
    const res = fetch(`${this.baseUrl}user`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}user`}, response status ${res.status}, ${res.message}`);
      }
      return res.json();
    });
    return res;
  }
}

const service = new Service();
console.log(service.registrationUser().then((res) => console.log(res)));
export default service;
