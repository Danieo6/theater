# Puppet Master

Puppeteer boiler-plate with integrated advanced logging, micro-server for dispatching jobs and simple sending result data.

## Dispatching jobs

### Using terminal

Run the command below

```
npm run dispatch
```

This will execute the queue that is saved in **src/queue.json**

### Using listener

Send a **POST** request to the /job endpoint of the listener

**Example:**
```
curl --request POST http://localhost:3000/job -H "Content-Type: application/json" -d '{"name": "takeScreenshot", "data": {"url": "https://github.com", "screenshotName": "screenshots/github.jpg"}}'
```