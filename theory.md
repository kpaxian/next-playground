
NextJs simplifies the process of building a web application for production.

1. Routing
2. API Routes
3. Rendering - client side and server side
4. Data fetching
5. Styling - CSS modules, tailwind and css in js
6. Optimization for images fonts and scripts
7. Development and production build system 

### Knowledge dependencies:
HTML, CSS and Javascript fundamentals


For a new project run the command `npx-create-next-app@latest` 
The flow control

When you run `npm run dev` command,  the execution is transferred to`layout.tsx` which renders `RootLayout` component; `RootLayout`, using `children` parameter, renders the content of the `page.tsx` file.

=============================================
### React Server Components (RSC)

RSC is a new architecture introduced by React in version 18 and used by NextJs
The architecture introduces a new way of creating React components, splitting them in 2 types:
 - Server components
 - Client components


#### Server Components
 - In NextJs, all components are Server components by default
 - They have the ability to run tasks like reading files or fetching data from a database
 - They don't have the ability to use hooks or handle user interactions
#### Client Components
 -  To create a client component it's necessary to add `use client` at the top of the component file
 - Client components cant perform tasks like reading files, but they have the ability to use hooks and manage interactions

=============================================
## Routing
NextJs has a file-system based routing mechanism
URL paths that users can access in the browser are defined by files and folders in your codebase.
#### Routing conventions
 - All routes must be placed inside the `app` folder
 - Every file that corresponds to a route must be named `page.ts` or `page.tsx`
 - Every folder corresponds to a path segment in the browser URL
When these conventions are followed every file become available as a route.
So, routes are associated with a `page.tsx` file based on the containing folder name within the `app` folder

#### Dynamic routes
Dynamic routes can be achieved using the bracket structure like this: `[paramId]`; The parameter can be further recovered by destructuring it from `{ params }` props from the functional server component; 

#### Not found page
The Not Found/404 page is handled by default by the NextJs application. However, at each routing level, a new Not Found page can be declared using a file called `not-found.tsx`; 
Additionally, each other page component can invoke `notFound()` function, imported from `"next/navigation"`.

#### Private Folders
A private folder indicates that it is a private implementation detail and should not be considered by the routing system
The folder and all its subfolders are excluded from routing
Prefix the folder name with an underscore
Private folder use case:
 - For separating UI logic from routing logic
 - for consistently organizing internal files across a project
 - for sorting and grouping files in code editors
 - for avoiding potential naming conflicts with future NextJs file conventions
 If you want to include an underscore in  URL segments, you can prefix the folder name with `%5F`, which is the URL-encoded form of an underscore

#### Route Groups
Allows to logically group routes and project files without affecting the URL path structure
Using parenthesis to a path folder, `(folder-example)`, instructs NextJs to omit that segment in the URL path.
This approach helps with a better code structure and a better development experience.

=============================================

### Layouts
A page is UI that is unique to a route.
A layout is UI that is shared between multiple pages in the app.
You can create a layout by default exporting a React component from a `layout.tsx` file.
That component should accept a children prop that will be populated with a child page during rendering.

=============================================

### Routing metadata
Ensuring proper SEO is crucial for increasing visibility and attracting users.
NextJs introduces the Metadata API which allows you to define metadata for each page.
Metadata ensures accurate and relevant information is displayed when your pages are shared or indexed.
There are 2 methods to acquire this:
 - Export a static metadata object
 - Export a dynamic `generateMetadata` function

#### Metadata rules 
Both `layout.tsx` and `page.tsx` files can export metadata. If defined in a layout, it applies to all pages in that layout, but if defined in a page, it applies only to that page.
Metadata is read in order, from the root level down to the final page level.
When there's metadata in multiple places for the same route, they get combined, but page metadata will replace layout metadata if they have the same properties.

`generateMetadata` function can be declared as `async`.
You cannot export the `generateMetadata` function and metadata object from the same route segment.

#### `title` Metadata
The `title` field's primary purpose is to define the document title.
It can be either `string` or `object`.

=============================================

### Navigation

#### Link Component Navigation
To enable client-side navigation, NextJs provides `Link` component. The `<Link>` component is a React component that extends the HTML `<a>` element, and it's the primary way to navigate between routes in NextJs. 
`<Link replace>` replaces the current history state instead of adding a new URL to the stack.
If you use navigation programmatically, useful documentation is located at
https://nextjs.org/docs/pages/api-reference/functions/use-router

============================================

### Templates
Layouts don't remount shared components, resulting in better performance. This is the common way, used in most situations. There are cases when you need layouts to create new instances for each new children when navigating(enter/exit animations or running side effects by using the `useEffect` hook when route changes).  Then you use `template` file as a replacement to `layout` file.

Templates are similar to layouts in that they wrap each child layout or page.
When a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized;
A template can be defined by exporting a default React component from a `template.tsx` file.

============================================
### Loading UI
`loading.tsx` file allows us to create loading states that are displayed to users while a specific route segment's content is loading.
The loading state appears immediately upon navigation, giving users the assurance that the application is responsive and actively loading content. 

 - You can display the loading state as soon as a user navigates to a new route. The immediate feedback reassures users that their action has been acknowledged,  reduces perceived loading times, and makes the application feel more responsive.
 - NextJs allows the creation of shared layouts that remain interactive while new route segments are loading. Users can continue interacting with certain parts of the application, such as a navigation menu or sidebar, even if the main content is still being fetched.


============================================
### Error handling
Automatically wrap a route segment and its nested children in a React Error Boundary
Create error UI tailored to specific segments using the file-system hierarchy to adjust granularity
Isolate errors to affected segments while keeping the rest of the application functional
Add functionality to attempt to recover from an error without a full page reload

#### Handling Errors in Nested Routes
Errors bubble up to the closest parent error boundary
An `error.tsx` file will cater to errors for all of its nested child segments
By positioning `error.tsx` files at different levels n the nested folders of a route, you can achieve a more granular level of error handling

#### Handling Errors in Layouts
An `error.tsx` file will handle errors for all its nested child segments
The error boundary does not catch errors thrown here because it's nested inside the layouts component.

============================================
###  Parallel Routes
Parallel routes are an advanced mechanism that allows for the simultaneous rendering of multiple pages within the same layout.
Parallel routes in NextJs are defined using a feature known as slots.
Slots help structure our content in a modular fashion.
To define a slot, we use tht `@folder` naming convention.
Each slot is then padded as a prop tot its corresponding `layout.tsx` file.

##### Parallel Routes Benefits
A clear benefit of parallel routes is their ability to split a single layout into various slots, making the code more manageable.

**Independent route handling**
 - each slot of your layout, such as user analytics or revenue metrics, can have its own loading and error states 
 - this granular control is particularly beneficial in scenarios where different sections of the page load at varying or encounter unique errors
Sub-navigation in routes
 - Each slot of your dashboard can essentially function as a mini-application, complete with its own navigation and state management
 - This is especially useful in complex applications such as dashboards where different sections serve distinct purposes.
#### Unmatched Routes
**Navigation form the UI**
In the case of navigation within the UI, NextJs retains the previously active state of a slot regardless of changes in the URL.

**`default.tsx`**
the `default.tsx` file in NextJs serves as a fallback to render content when the framework cannot retrieve a slot's active state from the current URL.
You have the complete freedom to define the UI for unmatched routes: you can either mirror the content found in `page.tsx` or craft an entirely custom view.

=============================================
### Advanced Routing Patterns

#### Intercepting routes
Intercepting routes allow you to intercept or stop the default routing behavior to present an alternate view or component when navigating trough the UI, while still preserving the intended route for scenarios like page reloads.
This can be useful if you want to show a route while keeping the context of the current page.


Intercepting Routes Conventions
 - use `(.)` to match segments on the same level
 - use `(..)` to match segments one level above
 - use `(..)(..)` to match segments two levels above
 -  use `(...)` to match segments from the root app directory

=============================================

### Route Handlers
Unlike page routes, which respond with HTML content, route handlers allow you to create RESTful endpoints, giving you full control over the response.
There is no overhead of having to create and configure a separate server.
Route handlers are also great form making external API requests.
Route handlers run server-side, ensuring that sensitive information like private keys remains secure and never gets shipped to the browser.
Route Handlers are the equivalent of API routes in Page router.

=============================================
### Headers in Route Handlers
HTTP headers represent the metadata associated with an API request and response.

##### Request Headers
These are sent by the client (browser) to the server.They contain essential information about the request, which helps the server  understand and process it correctly.
`User-Agent` which identifies the browser and operating system to the server.
`Accept` which indicates the content types like text, video, or image formats that the client can process.
`Authorization` header used by the client to authenticate itself to the server.

##### Response headers
These are sent back from the server to the client. They provide information about the server and the data being sent in the response.
`Content-Type` header which indicates the media type of the response. It tells the client what the data type of the returned content is. such as text/html for HTML documents, application/json for JSON data, etc.

=============================================
### Cookies in Route Handlers

Cookies are small pieces of data that a server sends to a user's web browser.
The browser may store the cookie and send it back to the same server with later requests.
Cookies are mainly used for three purposes:
 - Session management like logins and shopping carts.
 - Personalization like user preferences and themes.
 - Tracking like recording and analyzing user behavior.

=============================================
### Caching in Route Handlers

Route Handlers are cached by default when using the GET method with the Response object in NextJs.
How to opt out of caching?
 - dynamic mode in *Segment Config Option*
 - using the *Request* object with the `GET` method
 - employing dynamic functions like `headers()` and `cookies()`
 - using any HTTP method other than `GET`


=============================================
### Middleware
Middleware in NextJs is a powerful feature that offers a robust way to intercept and control the flow of requests and responses within your applications.
It does this at a global level enhancing features like redirection, URL rewrites, authentication, headers and cookies management and more. 
Middleware allows us to specify paths where it will be active:
 - Custom matcher config
 - Conditional statements


Routing Section Summary
 - Route definition
 - Pages and layouts
 - Dynamic routes
 - Route groups
 - Linking and Navigation
 - Handling errors in routes
 - Parallel and Intercepting routes
 - Route handlers and middleware

=============================================

## Rendering

Rendering is the process of transforming code into user interfaces.
In NextJs, choosing the right time and place to do this rendering is vital for building a performant application.

CSS, SSR and RSC's
Rendering in React -> Rendering in NextJs

Client Side Rendering
A method of rendering where the component code is transformed into a user interface directly within the browser (the client).
CSR quickly became the standard for SPAs, with widespread adoption.
It wasn't long before develpers began noticing some inherent drawbacks to this approach.

SEO
Generating HTML that mainly contains a single div tag is not optimal for SEO, as it provides little content for search engines to index.

Performance
Having the browser to handle all the work, such as fetching the data, computing the UI and making the HTML interactive can slow things down. Users might see a blank screen or a loading spinner while the page loads.
Each new feature added to the application increases the size of the Javascript bundle, prolonging the wait time for users to see the UI.


Server Side Rendering
Improves SEO  because search engines can easily index the server-rendered content.
Users can immediately see the page HTML content, instead of a blank screen or loading spinner.
During hydration, React takes control in the browser, reconstructing the component tree in memory based on the static HTML that was served, then proceeds to bind the necessary Javascript logic to these elements. This involves initializing the application state, attaching event handlers for actions such as clicks and mouseovers, and setting up any other dynamic functionalities required for a fully interactive user experience.
1. Static Site Generation (SSG)
2. Server Side Rendering (SSR)
**SSG** occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesn't change often, like blog posts.

**SSR** renders pages on-demand in response to user requests. It is suitable for personalized content like social media feeds, where the HTML depends on the logged-in user, providing faster initial page loads and better SEO.

#### Drawbacks of SSR

1. **You have to fetch everything before you can show anything**.
Components cannot start rendering and then pause or wait while data is still being loaded.
If a component needs to fetch data from a database or another source (like an API), this fetch must be completed before the server can begin rendering the page.
This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

2. You have to load everything before you can hydrate anything
For successful hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree.
This means that all the Javascript for the components must be loaded on the client before you can start hydrating any of them.

3. You have to hydrate everything before you can interact with anything 
React hydrates the component tree in a single pass, meaning once it starts hydrating it won't stop until it's finished with the entire tree. As a consequence, all components must be hydrated before you can interact with any of them.

All of Nothing Waterfall

1. having to load the data for the entire page
2. load the Javascript for the entire page
3. hydrate the entire page
All these 3 cases create a waterfall problem that spans from the server to the client where each issue must be resolved  before moving to the next one.
This is inefficient if some parts of your app are slower than others, as is often the case in real world apps.


#### Suspense SSR Architecture
Use `<Suspense>` component to unlock two major SSR features:
1. HTML streaming on the server.
2. Selective hydration on the client


HTML streaming on the server:
You don't have to fetch everything before you can show anything.
If a particular section delays the initial HTML, it can be seamlessly integrated into the stream later.
This is the essence of how Suspense facilitates server-side HTML streaming.

The other challenge
Until the Javascript for the main section is loaded, client-side app hydration cannot start.
If the Javascript bundle for the main section is large, this could significantly delay the process.

Code splitting

Code splitting allows you to mark specific code segment as not immediately necessary for loading, signalling your bundler to segregate them into separate `<script>` tags.
Using `React.lazy` for code splitting enables you to create separate the main section's code from the primary Javascript bundle.
The Javascript containing React and the code for the entire application, excluding the main section can now be downloaded independently by the client, without having to wait for the main section's code.

Selective Hydration on the Client
By wrapping the main section within `<Suspense>`, you've indicated to React that it should not prevent the rest of the page from not just streaming but also from hydrating.
This feature, called ***selective hydration*** allows for the hydration of sections as they become available, before the rest of the HTML and the Javascript code are fully downloaded. Thus, a heavy piece of JS doesn't prevent the rest of the page from becoming interactive.

Drawbacks of Suspense SSR
Even though Javascript code is streamed to the browser asynchronously, the entire code for a web page must be downloaded by the user.
As applications add more features, the amount of code users need to download also grows, This leads to an important question:
**Should users really have to download so much data?**

Second, the current approach requires that all React components undergo hydration on the client-side, irrespective of their actual need for interactivity.
This process can inefficiently spend resources and extend the loading times and time to interactivity for users, as their devices need to process and render components that might not even require client-side interaction.
This leads to another question:
**Should all components be hydrated, even those that don't need interactivity?**

Third, in spite of servers' superior capacity for handling intensive processing tasks, the bulk of Javascript execution takes place on the user's device.
This can slow down the performance, especially on devices that are not very powerful.
**Should so much of the work be done on the user's device?**

#### React Server Components
RSC represent a new architecture designed by the React team.
This approach aims to leverage the strengths of both server and client environments, optimizing for efficiency, load times and interactivity.
The architecture introduces a dual-component model:
 - Client Components
 - Server Components
This distinction is not based on the functionality of the components but rather on where they execute and the specific environments they are designed to interact with.

Client Components have access to the client environment, such as the browser, allowing them to use state, effects, and event listeners to handle interactivity and also access browser-exclusive APIs like `geolocation` or `localStorage`, allowing you to build UI for specific use cases.
In fact, the term "Client Components" doesn't signify anything new; it simply helps differentiate these components from the newly introduced "Server Components".

Server Components represent a new type of React components specifically designed to operate exclusively on the server., the code is never downloaded to the client.

#### Benefits of Server Components
**Reduced Bundle Size**
Server Components do not send code to the client, allowing large dependencies to remain server-side.
This benefits users with slower internet connections or less capable devices by eliminating the need to download, parse and execute Javascript for these components.
Additionally, it removes the hydration step, speeding up app loading and interaction.


**Direct Access to Server-side Resources**
By having direct access to server-side resources like databases or file systems, Server Components enable efficient data fetching and rendering without needing additional client-side processing.
Leveraging the server's computational power and proximity to data sources, they manage compute-intensive rendering tasks and send only interactive pieces of code to the client.

**Enhanced Security**
Server Components' exclusive server-side execution enhances security by keeping sensitive data and logic, including tokens and API keys away from the client-side.

**Improved Data Fetching**
Server Components enhance data fetching efficiency.
Typically, when fetching data on the client-side using `useEffect`, a child component cannot begin loading its data until the parent component has finished loading its own. This sequential fetching of data often leads to poor performance.
The main issue is not the round trips themselves, but that these round trips are made from the client to the server.
Server Components enable applications to shift these sequential round trips to the server side.
By moving this logic to the server, request latency is reduced, and overall performance is improved, eliminating client-server "waterfalls".

**Caching**
Rendering on the server enables caching the results, which can be reused in subsequent requests and across different users.
This approach can significantly improve performance and reduce costs by minimizing the amount of rendering and data fetching required for each request.

**Faster Initial Page Load and First Contentful Paint**
Initial Page Load and *First Contentful Paint (FCP)* are significantly improved  
with Server Components.

**Improved SEO**
Regarding Search Engine Optimization, the server-rendered HTML is fully accessible to search engine bots, enhancing the indexability of your pages.

**Efficient Streaming**
Server Components allows the rendering process to be divided into manageable chunks, which are then streamed to the client as soon as they are ready.
This approach allows users to start seeing parts of the page earlier, eliminating the need to wait for the entire page to finish rendering on the server.

Server Components take charge of data fetching and static rendering, while Client Components are tasked with rendering the interactive elements of the application. The bottom line is that the RSC architecture enables React applications to leverage the best aspects of both server and client rendering, all while using a single language, a single framework, and a cohesive set of APIs.


RSC + NextJs

By default, every component in Next app is considered a server component. Server components are rendered only on the server. Client components are rendered once on the server and then on the client.

RSC Rendering Lifecycle

![[rendering-cycle.png]]

![[update-cycle.png]]


Server Rendering Strategies
Static rendering
Dynamic rendering
Streaming

##### Static rendering\
Static rendering is a server rendering strategy where we generate HTML pages at the time of building our application.
This approach allows the page to build once, cached by CDN and served to the client almost instantly.
This optimization also enables you to share the result of the rendering work among different users, resulting in a significant performance boost for your application. 
Static rendering is particularly useful for blog pages. e-commerce, product pages, documentation and marketing pages. 

Static rendering is the default rendering strategy in the app router.
All routes are automatically prepared at build time without additional setup.
###### Production Server vs Development Server 
For production. an optimized build is creates once, and you deploy that build.
A dev server, on the other hand focuses on the developer experience.
We can't afford to build our app once, make changes, rebuild, and so on.
For production builds. a page will be pre-rendered once when we run the build command.
In dev mode, a page will be pre-rendered for every request.

##### Prefetching
Prefetching is a technique used to preload a route in the background before the user navigates to it.
Routes are automatically prefetched as they become  visible in the user's viewport either when the page first loads or as it comes into view through scrolling.
For static routes, the entire route is prefetched and cached by default keeping it for instant navigation.

Static Rendering Summary
Static rendering is a strategy where the HTML is generated at build time. Along with the HTML, the RSC payload is created for each component, and Javascript chinks are produced for client-side component hydration in the browser.
If you navigate directly to a page route, the corresponding HTML file is served. If you navigate to the route from a different one, the route is created on the client side using the RSC payload and Javascript chunks, without any additional request to the server.


##### Dynamic Rendering  
  
Dynamic rendering is a server rendering strategy where routes are rendered for each user at request time. 
It is useful when a route has data that is personalized to the user or contains information that can only be known at request time, such as cookies or the URL's search parameters.  
News websites, personalized e-commerce pages, and social media feeds are some examples where dynamic rendering is beneficial.

##### How to Dynamically Render  
  
During rendering, if a dynamic function is discovered, Next.js will switch to dynamically rendering the whole route.
In Next.js, these dynamic functions are: `cookies()`, `headers()`, and `searchParams`. Using any of these will opt the whole route into dynamic rendering at request time.


#### Streaming  
Streaming is a strategy that allows for progressive Ul rendering from the server.
Work is divided into chunks and streamed to the client as soon as it's ready. This enables users to see parts of the page immediately, before the entire content has finished rendering.
Streaming significantly improves both the initial page loading performance and the rendering of Ul elements that rely on slower data fetches, which would otherwise block the rendering of the entire route.
Streaming is integrated into the Next.js App Router by default.



### Server and Client Composition Patterns  
**Server components**  
- Fetching data  
- Directly accessing backend resources  
- Protecting sensitive information (like access tokens and API keys) on the server  
- Keeping large dependencies server-side, which helps in reducing client-side Javascript.

**Client components**
- Adding interactivity  
- Handling event listeners (such as `onClick()`, `onChange()`, etc)
- Managing state and lifecycle effects (using hooks like `useState()`, `useReducer()`, `useEffect()`)
- Using browser-exclusive APIs
- Using custom hooks
- Using React Class components.


#### Server-only Code
Certain code is intended to execute only on the server.
You might have modules or functions that use multiple libraries, use environment variables, interact directly with a database, or process confidential information. Since JavaScript modules can be shared, it's possible for code that's meant only for the server to unintentionally end up in the client.
If server-side code gets bundled into the client-side JavaScript, it could lead to a bloated bundle size, expose secret keys, database queries, and sensitive business logic.
It is crucial to separate server-only code from client-side code to protect the application security and integrity.

server only Package

Provide a build-time error if developers accidentally import one of these modules into a Client Component.























Special files
`page, layout, template, not-found, loading, error, default, route`

![[components-order.png]]
https://www.youtube.com/watch?v=t2tNpubt4y0&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=56









