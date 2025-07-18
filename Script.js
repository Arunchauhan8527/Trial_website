
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form1");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const messege = document.querySelector("#messege").value;

    try {
      const res = await fetch("http://localhost:3000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          messege
        })
      });

     const text = await res.text(); // always parse as text first

        let data = {};
        try {
          data = JSON.parse(text); // convert text to JSON if possible
        } catch (e) {
          data.messege = text; // fallback if not JSON
        }
      if(res.ok){
      alert("form submitted successfully");

      form.reset();
      }
      else{
        alert(data.messege||"submission failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  });
});
function showCustomAlert() {
  document.getElementById("customAlert").style.display = "block";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

