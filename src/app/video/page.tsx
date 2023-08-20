import { redirect } from "next/navigation";

let html = `
<div style="position:relative;width:fit-content;height:fit-content;">
            <a style="position:absolute;top:20px;right:1rem;opacity:0.8;" href="https://clipchamp.com/watch/cf5WGeZorHG?utm_source=embed&utm_medium=embed&utm_campaign=watch%22%3E
                <img loading="lazy" style="height:22px;" src="https://clipchamp.com/e.svg" alt="Made with Clipchamp" />
            </a>
            <iframe allow="autoplay;" allowfullscreen style="border:none" src="https://clipchamp.com/watch/cf5WGeZorHG/embed" width="640" height="360"></iframe>
        </div>`;

export default async function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
