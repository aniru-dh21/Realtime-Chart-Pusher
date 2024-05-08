import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.NEXT_SECRET_PUSHER_APP_ID,
  key: process.env.NEXT_SECRET_PUSHER_KEY,
  secret: process.env.NEXT_SECRET_PUSHER_SECRET,
  cluster: process.env.NEXT_SECRET_PUSHER_CLUSTER,
  useTLS: true,
});

export async function GET() {
  // Define the initial value
  const value = Math.random() * 800000 + 200000;

  setInterval(() => {
    pusher.trigger("company-income", "new-price", {
      value: value,
    });

    return Response.json({ value: value }, { status: 200 });
    // Every ten seconds, the setInterval method will get data from the API because its value is set to ten seconds. Pusher's free plans are limited to 200,000 messages a day, so be careful while reducing the interval or you risk exceeding your limit too soon.
  }, 10000);
  return Response.json({ value: value }, { status: 200 });
}
