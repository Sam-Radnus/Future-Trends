const apiKey = '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'; // replace with your actual API key

// function to generate dress image using DALL-E API
async function generateDressImage(color, pattern, style) {
  // create HTTP request body
  const requestBody = {
    "model": "image-alpha-001",
    "prompt": `a ${color} dress with ${pattern} pattern and ${style} style ,photorealistic images`,
    "n":5,
    "size": "256x256"
  }; 
   console.log(requestBody);
  // send HTTP request to DALL-E API
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    
    body: JSON.stringify(requestBody)
  });
  
  // parse response and return generated image URL
  const responseData = await response.json();
  console.log(responseData.data);
  const images=responseData.data;
  console.log(images);
  const generatedImageUrl = responseData.data[0].url;
  variations=responseData.data;
  
  // update img tag with generated image URL
  const designPreview = document.getElementById('design-preview-image');
  designPreview.src = generatedImageUrl;

  // set imageUrl variable to generated image URL
  //imageUrl.value = generatedImageUrl;

  return generatedImageUrl;
}

// function to generate image variations using DALL-E API
async function generateImageVariations(imageUrl) {
  // get URL of generated dress image
  const dressImageUrl = imageUrl;

  // create HTTP request body
  const requestBody = {
    "model": "image-alpha-001",
    "prompt": `a variation of a ${color} dress with ${pattern} pattern and ${style} style based on this image: ${dressImageUrl}`,
    "n":1,
    "size": "256x256"
  };
  
  console.log(requestBody)
  // send HTTP request to DALL-E API
  /*
  const response = await fetch('https://api.openai.com/v1/images/variations', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });
  */
 
  
  console.log(imageUrl);
  const response = await fetch(imageUrl);
  console.log(response);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('image', blob, 'image.png');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body:formData
  };
  
  fetch('https://api.openai.com/v1/images/variations', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Do something with the variations data
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  /*
  var image_url = response.data.data[0].url;
  const generatedImageVariationsUrls= responseData.data.map((data) => data.url);
  // update img tag with generated image URL
  const variationPreview = document.getElementById('variation-preview-image');
  variationPreview.src = generatedImageVariationsUrls[0];

  return generatedImageVariationsUrls;
    */
   return null;
}


const designForm = document.querySelector('#design-form');
const designPreview = document.querySelector('#design-preview-image');
const variationPreview = document.querySelector('#variation-preview-image');
const designName = document.querySelector('#design-name');
const designPrice = document.querySelector('#design-price');
const addToCartButton = document.querySelector('#add-to-cart');
const cartList = document.querySelector('#cart-list');
const cartTotal = document.querySelector('#cart-total');
const checkoutButton = document.querySelector('#checkout');
let variations=null;
//const generateVariationsButton = document.querySelector('#generate-variations'); // select button element by id
const generateVariationsButton = document.getElementById('generate-variations');
var imageUrl="";
var color="";
var pattern="";
var style="";

designForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  color = event.target.elements.color.value;
  pattern = event.target.elements.pattern.value;
  style = event.target.elements.style.value;
  imageUrl = await generateDressImage(color, pattern, style);
  console.log(imageUrl);

  designPreview.src = imageUrl;
});

generateVariationsButton.addEventListener('click', async () => {
  console.log("image");
  if(!variations) return; 
  
  let variations_images = [
    {url: 'https://www.olympusimage.com.my/content/000010806.jpg'},
    {url: 'https://www.olympusimage.com.my/content/000010806.jpg'},
    {url: 'https://www.olympusimage.com.my/content/000010806.jpg'},
    {url: 'https://www.olympusimage.com.my/content/000010806.jpg'}
  ];
  const variationEl=document.querySelector('.variation-preview');
  console.log(variations_images);
  console.log(variations)
  for(let i=1;i<5;i++){
    console.log(`variation-preview-image ${i}`)
    const variationElChild=document.getElementById(`variation-preview-image ${i}`);
    console.log(variationElChild);
    console.log(variations[i].url);
    variationElChild.src=variations[i].url;
  }
  // const generatedImageVariationsUrls = await generateImageVariations(imageUrl);
// // Get all variation images
// const variationImages = document.querySelectorAll(".variation-preview img");

// // Add a click event listener to each variation image
// variationImages.forEach((img) => {
//   img.addEventListener("click", () => {
//     // Handle image click event here
//     console.log(`Image ${img.alt} was clicked`);
//   });
// });

   
});

  const name = generateDressName(color, pattern, style);
  designName.textContent = name;

  const price = generateDressPrice();
  designPrice.textContent = `Price: $${price}`;
{
  addToCartButton.disabled = false;
  addToCartButton.dataset.name = name;
  addToCartButton.dataset.price = price;
};

addToCartButton.addEventListener('click', (event) => {
  const name = event.target.dataset.name;
  const price = event.target.dataset.price;
  addToCart(name, price);
});

function generateDressName(color, pattern, style) {
  // Generate a dress name based on user input
  // Return the generated dress name
}

function generateDressPrice() {
  // Generate a random dress price between $50 and $200
  // Return the generated dress price
}

function addToCart(name, price) {
  // Add the dress to the cart list
  // Update the cart total
}

checkoutButton.addEventListener('click', () => {
  // Redirect to the checkout page
});

// document.querySelectorAll('#question1 ul li').forEach(option => {
//   option.addEventListener('click', event => {
//     const nextQuestion = document.querySelector('#question2');
//     nextQuestion.classList.add('active');
//   });
// });


