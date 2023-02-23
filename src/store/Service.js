class Service {
  baseUrl = 'https://blog.kata.academy/api/';
  async getArticles(skip) {
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
  async editProfilee(token, data) {
    console.log(token, data);
    const res = fetch(`${this.baseUrl}user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: String(data.username),
          password: String(data.password),
          email: String(data.email),
          image: String(data.img),
        },
      }),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}users`}, response status ${res.status}, ${res.message}`);
      }
      return res.json();
    });
    console.log(res);
    return res;
  }
  async postNewArticle(token, data) {
    console.log(data);
    const tags = data.tags.map((obj) => {
      let first = Object.values(obj);
      let second = first[0];
      return second;
    });
    console.log(String([...tags]));
    const res = fetch(`${this.baseUrl}articles`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: String(data.title),
          description: String(data.description),
          body: String(data.text),
          tagList: [...tags],
        },
      }),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}users`}, response status ${res.status}, ${res.message}`);
      }
      return res.json();
    });
    console.log(res);
    return res;
  }
  async editArticle(token, data, slug) {
    console.log(token, data);
    const tags = data.tags.map((obj) => {
      let first = Object.values(obj);
      let second = first[0];
      return second;
    });
    console.log(tags);
    const res = fetch(`${this.baseUrl}articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: String(data.title),
          description: String(data.description),
          body: String(data.text),
          tagList: [...tags],
        },
      }),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}users`}, response status ${res.status}, ${res.message}`);
      }
      return res.json();
    });
    console.log(res);
    return res;
  }
  async deleteArticle(token, slug) {
    const res = fetch(`${this.baseUrl}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}articles`}, response status ${res.status}`);
      }
      return res;
    });
    return res;
  }
  async favoriteArticle(token, slug) {
    const res = fetch(`${this.baseUrl}articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${`${this.baseStr}articles/favorites`}, response status ${res.status}`);
      }
      return res.json();
    });
    return res;
  }
}

const service = new Service();
//console.log(service.editProfile().then((res) => console.log(res)));
export default service;
