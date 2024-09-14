import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req, ctx) {
        return await ctx.render();
    },
    async POST(req, ctx) {
        const form = await req.formData();
        const collection = form.get("collection_id")?.toString();

        console.log(form)
        console.log(collection)
        
        const apiURL = "http://localhost:9000/openeo/collection"; // Ajustar según la URL de la API

        try {
            const response = await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "collection_id": collection }), // Ajustar según la estructura esperada por la API
            });
            
            console.log(response.body)   

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const jsonResponse = await response.json();
            console.log("Response from API:", jsonResponse);

            // Redirigir a la página principal
            const headers = new Headers();
            headers.set("location", "/");
            return new Response(null, {
                status: 303,
                headers,
            });
        } catch (error) {
            console.error("Error sending data to API:", error);
            // Redirigir a la página principal en caso de error
            const headers = new Headers();
            headers.set("location", "/");
            return new Response(null, {
                status: 303,
                headers,
            });
        }
    },
};

export default function OpenEO() {
    return (
        <>
            <form method="post">
                <label>Collection</label>
                <input name="collection_id" value="" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}