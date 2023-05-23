export async function middleware(request: Request) {
  console.log("middleware running");
}

export const config = {
  matcher: ["/search"],
};
