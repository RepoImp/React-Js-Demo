import axios from "axios";
let token = localStorage.getItem("token");

export async function fetchJSON(url, method = "GET", data = undefined) {
  const params = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  if (data) {
    params.body = data ? JSON.stringify(data) : undefined;
  }
  return await fetch(url, params);
}

export async function uploadFile(url, name, params) {  
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("customer", params.customer);
  formData.append("remark", params.remark);
  formData.append("ftpDestinationPath", params.ftpDestinationPath);
  return await axios.post(`/api/${url}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': "*/*",
      'Authorization': `Basic ${token}`,
    },
  });
}

export async function downloadFile(id) {
  return await axios.post(`/api/debugFile/${id}`,null, {
    headers: {
      'Authorization': `Basic ${token}`,
    },
  });
}

export async function fetchBlob(url) {
  return new Promise(async (resolve, reject) => {
    const blob = await (
      await fetch(`/api/${url}`, { credentials: "include" })
    ).blob();
    const reader = new FileReader();
    reader.onload = function () {
      resolve(this.result);
    };
    reader.readAsDataURL(blob);
  });
}
