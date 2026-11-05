export const CAKE_ITEMS = [
    {
        id: "strawberry",
        name: "BERRY DREAM",
        tagline: "A little sweetness, beautifully crafted",
        buttonText: "DISCOVER OUR CAKE",
        bgImage: "/cakes images/strawberry-background.png",
        fallbackBg: "radial-gradient(circle at 50% 50%, #f7b2c9 0%, #d84b7a 100%)",
        dripImage: "/cakes images/Dripping pink icing.png",
        cakeImage: "/cakes images/strawberry.png",
        themeColor: "#c92b67",
        textColor: "#ffffff",
        titleColor: "#ffe8dc",
        copyColor: "#8f174c",
        buttonTextColor: "#b2174c",
        buttonBg: "rgba(255, 220, 235, 0.72)",
        buttonBorder: "rgba(255, 235, 244, 0.72)",
    },
    {
        id: "chocolate",
        name: "CHOCOLATE DREAM",
        tagline: "A little chocolate, a whole lot of happiness.",
        buttonText: "DISCOVER OUR CAKE",
        bgImage: "/cakes images/chologate-background.png",
        fallbackBg: "radial-gradient(circle at 50% 50%, #6d3a1f 0%, #2f1307 100%)",
        dripImage: "/cakes images/Dripping chologate icing.png",
        cakeImage: "/cakes images/chocolate.png",
        themeColor: "#572b14",
        textColor: "#f4dbcd",
        titleColor: "#f4dbcd",
        copyColor: "#f4dbcd",
        buttonTextColor: "#572b14",
        buttonBg: "rgba(240, 195, 168, 0.58)",
        buttonBorder: "rgba(244, 219, 205, 0.6)",
    },
    {
        id: "vanilla",
        name: "VANILLA DREAM",
        tagline: "A taste of pure elegance, wrapped in vanilla bliss.",
        buttonText: "DISCOVER OUR CAKE",
        bgImage: "/cakes images/vanilla-background.png",
        fallbackBg: "radial-gradient(circle at 50% 50%, #fae6c6 0%, #d8b783 100%)",
        dripImage: "/cakes images/Dripping vannila icing.png",
        cakeImage: "/cakes images/vanilla.png",
        themeColor: "#9c703b",
        textColor: "#3d2b1f",
        titleColor: "#3d2b1f",
        copyColor: "#8a5d2e",
        buttonTextColor: "#5e3618",
        buttonBg: "rgba(245, 225, 190, 0.72)",
        buttonBorder: "rgba(216, 183, 131, 0.6)",
    },
    {
        id: "pistachio",
        name: "PISTACHIO DREAM",
        tagline: "A little nutty, a little dreamy, pure pistachio bliss.",
        buttonText: "DISCOVER OUR CAKE",
        bgImage: "/cakes images/pistacho-background.png",
        fallbackBg: "radial-gradient(circle at 50% 50%, #c8da8b 0%, #6e8433 100%)",
        dripImage: "/cakes images/Dripping pistacho icing.png",
        cakeImage: "/cakes images/pistachio.png",
        themeColor: "#5b6e22",
        textColor: "#ffffff",
        titleColor: "#fff7d8",
        copyColor: "#fff7d8",
        buttonTextColor: "#6b7825",
        buttonBg: "rgba(224, 238, 175, 0.68)",
        buttonBorder: "rgba(255, 255, 255, 0.6)",
    },
];

// Center Exploding Cake Slice Image
export const SIGNATURE_CENTER_IMAGE = "/cakes images/slice layers.png";

// Full-bleed background for the signature cake showcase
export const SIGNATURE_BACKGROUND_IMAGE = "/cakes images/signature-background.png";

// Left 3 Signature Cakes
export const SIGNATURE_CAKES_LEFT = [
    {
        id: "rose-strawberry",
        title: "Rose Strawberry",
        desc: "Fresh strawberries, delicate cream and a touch of romance.",
        image: "/cakes images/mini-cakes1.png",
        btnBg: "#e06b82",
        titleColor: "#c23455",
        side: "left",
    },
    {
        id: "vanilla-cloud",
        title: "Vanilla Cloud",
        desc: "Light, silky vanilla cream with a timeless classic taste.",
        image: "/cakes images/mini-cakes2.png",
        btnBg: "#8d4f21",
        titleColor: "#422818",
        side: "left",
    },
    {
        id: "wedding-cakes",
        title: "Wedding Cakes",
        desc: "Elegantly designed cakes for your most special day.",
        image: "/cakes images/mini-cakes3.png",
        btnBg: "#aa465d",
        titleColor: "#801d36",
        side: "left",
    },
];

// Right 3 Signature Cakes
export const SIGNATURE_CAKES_RIGHT = [
    {
        id: "dark-chocolate",
        title: "Dark Chocolate",
        desc: "Rich chocolate layers for the ultimate indulgence",
        image: "/cakes images/mini-cakes4.png",
        btnBg: "#4e2518",
        titleColor: "#220e06",
        side: "right",
    },
    {
        id: "pistachio-reverie",
        title: "Pistachio Reverie",
        desc: "Nutty, elegant and uniquely delicious in every bite.",
        image: "/cakes images/mini-cakes5.png",
        btnBg: "#5b6b2c",
        titleColor: "#354411",
        side: "right",
    },
    {
        id: "custom-cakes",
        title: "Custom Cakes",
        desc: "Personalised cakes for birthday, anniversaries and special occasions.",
        image: "/cakes images/mini-cakes6.png",
        btnBg: "#9f565a",
        titleColor: "#672528",
        side: "right",
    },
];

const aboutImagePath = "/cakes images/";
const bgAbout = `${aboutImagePath}bacground-about.png`;
const videoFrame = `${aboutImagePath}video-frame.png`;
const cakeVideo = `${aboutImagePath}cake-video.mp4`;

const finestFrame = `${aboutImagePath}finest-frame.png`;
const handcraftedFrame = `${aboutImagePath}Handcrafted-frame.png`;
const attentionFrame = `${aboutImagePath}Attention-Frame.png`;
const createdFrame = `${aboutImagePath}Created-frame.png`;
const sweetFrame = `${aboutImagePath}sweet-frame.png`;

const bowlChocolate = `${aboutImagePath}bowl-chologate.png`;
const bowlStrawberry = `${aboutImagePath}bowl-strawberry.png`;
const putCream = `${aboutImagePath}put-cream.png`;
const berryCake = `${aboutImagePath}berry-cholo cake.png`;
const sliceCake = `${aboutImagePath}slice cake.png`;

export const aboutAssets = { bgAbout, videoFrame, cakeVideo };

export const aboutText = {
    titleOur: "OUR",
    titleStory: "Story",
    subtitle: ["MORE THAN JUST CAKES,", "WE CREATE SWEET MEMORIES."],
    body:
        "At Sweeté Patisserie, every cake tells a story. What started as a passion for baking has grown into a dream to bring joy to every celebration. We believe in using the finest ingredients, handcrafted with care, to create desserts that make life's moments a little sweeter.",
    button: "WATCH OUR JOURNEY",
};

export const features = [
    { icon: "leaf",  title: "PREMIUM INGREDIENTS",  text: "We use high-quality, fresh ingredients for the best taste." },
    { icon: "whisk", title: "HANDCRAFTED WITH LOVE", text: "Every creation is made with passion and attention to detail." },
    { icon: "cake",  title: "UNIQUE DESIGNS",        text: "From classic elegance to custom creations." },
    { icon: "heart", title: "SWEET MOMENTS",         text: "Making your special occasions even sweeter." },
];

export const frames = [
    { id: 1, frame: finestFrame,      image: bowlChocolate,  label: ["FINEST", "INGREDIENTS"] },
    { id: 2, frame: handcraftedFrame, image: bowlStrawberry, label: ["HANDCRAFTED", "WITH LOVE"] },
    { id: 3, frame: attentionFrame,   image: putCream,       label: ["ATTENTION", "TO EVERY DETAIL"] },
    { id: 4, frame: createdFrame,     image: berryCake,      label: ["CREATED", "FOR EVERY CELEBRATION"] },
    { id: 5, frame: sweetFrame,       image: sliceCake,      label: ["SWEET", "MEMORIES"] },
];

/* ================= COLLECTION SECTION ================= */
const collectionImagePath = "/cakes images/";
const collectionBg = `${collectionImagePath}collection-background.png`;
const mainEntrance = `${collectionImagePath}main entrance.png`;
const mothersDay = `${collectionImagePath}mothers day cakes.png`;
const fathersDay = `${collectionImagePath}fathers day cakes.png`;
const birthday = `${collectionImagePath}birthday cake.png`;
const custom = `${collectionImagePath}coustome cake.png`;
const pastries = `${collectionImagePath}pastries.png`;
const cupcakes = `${collectionImagePath}cap cake.png`;
const wedding = `${collectionImagePath}weeding cakes.png`;
const donuts = `${collectionImagePath}donut.png`;
const iceCream = `${collectionImagePath}ice cream.png`;
const brownies = `${collectionImagePath}brownies.png`;
const cheesecake = `${collectionImagePath}chesee make.png`;
const macarons = `${collectionImagePath}macrron.png`;

export const collectionAssets = { collectionBg, mainEntrance };

export const collectionText = {
    brand: "Sweeté Patisserie",
    tagline: "Artisanal Cakes & Desserts",
    title: "Our Collections",
    subtitle: "Explore Our Delightful Range of Cakes, Desserts & Special Creations for Every Celebration",
    button: "Explore Full Collection",
};

// 3 rows x 2 on each side, same order as the design
export const leftCollection = [
    { id: "mothers", name: ["Mother's Day", "Cakes"], image: mothersDay },
    { id: "fathers", name: ["Father's Day", "Cakes"], image: fathersDay },
    { id: "birthday", name: ["Birthday", "Cakes"], image: birthday },
    { id: "custom", name: ["Custom", "Cakes"], image: custom },
    { id: "pastries", name: ["Pastries"], image: pastries },
    { id: "cupcakes", name: ["Cupcakes"], image: cupcakes },
];

export const rightCollection = [
    { id: "wedding", name: ["Wedding", "Cakes"], image: wedding },
    { id: "donuts", name: ["Donuts"], image: donuts },
    { id: "icecream", name: ["Ice", "Cream"], image: iceCream },
    { id: "brownies", name: ["Brownies"], image: brownies },
    { id: "cheesecake", name: ["Cheesecakes"], image: cheesecake },
    { id: "macarons", name: ["Macarons"], image: macarons },
];

const reviewImagePath = "/cakes images/";
export const reviewAssets = {
    background: `${reviewImagePath}review background.png`,
};
export const reviewHeading = {
    brand: 'Sweeté Patisserie',
    tagline: 'Artisanal Cakes & Desserts',
    title: 'Customer',
    script: 'Reviews',
    subtitle: 'What Our Sweet Customers Say',
};
// Review text transcribed from your reference; replace with verified customer
// feedback before publishing. The artwork already contains each cake + frame.
export const reviews = [
    { id: 'birthday', image: `${reviewImagePath}Review 1.png`, alt: 'Pink birthday cake in its original golden review frame', text: 'The birthday cake was perfect! Fresh, beautifully designed and everyone loved it!', order: 'Birthday Order', icon: 'cake', rating: 5 },
    { id: 'wedding', image: `${reviewImagePath}Review 2.png`, alt: 'Wedding cake in its original golden review frame', text: 'Ordered for a wedding and it was absolutely stunning! The taste and detail were beyond expectations.', order: 'Wedding Order', icon: 'ring', rating: 5 },
    { id: 'desserts', image: `${reviewImagePath}Review 3.png`, alt: 'Cupcakes in their original golden review frame', text: 'Loved the desserts variety! From cupcakes to brownies, everything was so delicious and fresh.', order: 'Dessert Box', icon: 'cupcake', rating: 5 },
    { id: 'repeat', image: `${reviewImagePath}Review 4.png`, alt: 'Brownies in their original golden review frame', text: 'Great service, quick response and the cakes are always consistent in quality. My go-to patisserie!', order: 'Repeat Customer', icon: 'heart', rating: 5 },
];

export const contactAssets = { background: "/cakes images/contact-background.png" };
export const contactCopy = {
    title: 'Contact Us',
    subtitle: 'We’d love to hear from you! Get in touch for orders, custom cakes, or any enquiries.',
    formTitle: 'Send Us a Message',
    socialTitle: 'Follow Our Sweet Journey',
};
// These details are copied from the reference, NOT verified business details.
// Replace them before publishing. The form opens the visitor's email app;
// it does not send, store, or claim to deliver an enquiry automatically.
export const contactDetails = {
    location: 'Ipoh, Perak, Malaysia',
    phone: '+60 12-345 6789',
    email: 'hello@sweete-patisserie.com',
    hours: 'Mon – Sun : 10:00 AM – 8:00 PM',
};
export const orderTypes = ['Birthday Cake', 'Wedding Cake', 'Custom Cake', 'Dessert Box', 'Other Enquiry'];
// Add your real profile URLs; empty profiles are not rendered as dead links.
export const socialLinks = [
    { name: 'Instagram', icon: 'instagram', url: '' },
    { name: 'Facebook', icon: 'facebook', url: '' },
    { name: 'TikTok', icon: 'music', url: '' },
    { name: 'YouTube', icon: 'youtube', url: '' },
];