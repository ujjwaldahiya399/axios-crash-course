// const { default: axios } = require("axios");
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
// GET REQUEST
function getTodos() {
  // axios({
  //   method:"get",
  //   url:"  axios({
  //   params:{
  //     _limit:5
  //   }
  // }).then(res => showOutput(res))
  // .catch(err => console.log(err));
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      params: { _limit: 5 },
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      data: {
        title: "new Todo",
        completed: false,
        id: 101,
      },
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log("PUT/PATCH Request");
  axios
    .put("https://jsonplaceholder.typicode.com/todos/5", {
      data: {
        title: "new Todo",
        completed: false,
        id: 101,
      },
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log("DELETE Request");
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then(
      axios.spread((todos, posts) => {
        console.log(todos);
        console.log(posts);
        showOutput(posts);
      })
    );
  // ]).then(res => {
  //   console.log(res[0])
  //   console.log(res[1])
  //   showOutput(res[1]);
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some secret Token",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        data: {
          title: "new Todo",
          completed: false,
          id: 101,
        },
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/posts",
    data: {
      title: "new title",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options).then((response) => {
    showOutput(response);
  });
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
  axios
  .get("https://jsonplaceholder.typicode.com/todoss", {
    params: { _limit: 5 },
  }).then((response) => {
    showOutput(response);
  })
  .catch((error) => {
    if(error.response){
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    if(error.response.status === 404){
      alert("Error! not found");
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
  let source = axios.CancelToken.source();
  axios
  .get("https://jsonplaceholder.typicode.com/todos", {
    cancelToken:source.token
  }).then((response) => {
    showOutput(response);
  })
  .catch(thrown => {
    if(axios.isCancel(thrown)) {
      console.log("request cancelled", thrown.message);
    }
  })
  if (true) {
    source.cancel("Request Cancelled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request send to: ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (err) => console.log(err)
);
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
