# c-chat
Secure and lightweight chat for local networks

## How to install?
-------------------------------------------

```
$ npm install c-chat -g
```
... or
```
$ git clone https://github.com/hackwork-tymm0/c-chat.git && cd c-chat && npm install -g
```

## How to use?
-------------------------------------------

To start select the port
```
$ sudo c-chat set-port=PORT_NUMBER
```

And start 
```
$ c-chat start
```

And browse your server
```
http://SERVER_IP:PORT_NUMBER // example - http://192.168.1.3:3030
```

## New Features via C-Chat
Using C-chat Discord messaging platform, you can follow these steps.

1.Install the Discord.Net library by running the following command in the NuGet Package Manager Console:
```
Install-Package Discord.Net
```

2.Create a new class in the c-chat project to handle Discord interactions. Here's an example:
```
using Discord;
using Discord.WebSocket;

public class DiscordChatBot
{
    private DiscordSocketClient _client;

    public DiscordChatBot(string token)
    {
        _client = new DiscordSocketClient();
        _client.Log += LogAsync;
        _client.Ready += ReadyAsync;
        _client.MessageReceived += MessageReceivedAsync;

        _client.LoginAsync(TokenType.Bot, token);
        _client.StartAsync();
    }

    private Task LogAsync(LogMessage msg)
    {
        Console.WriteLine(msg.ToString());
        return Task.CompletedTask;
    }

    private Task ReadyAsync()
    {
        Console.WriteLine("Discord bot is ready.");
        return Task.CompletedTask;
    }

    private async Task MessageReceivedAsync(SocketMessage arg)
    {
        if (arg.Author.IsBot)
        {
            return;
        }

        string message = arg.Content;
        string response = await SendMessageAsync(message);

        if (!string.IsNullOrEmpty(response))
        {
            await arg.Channel.SendMessageAsync(response);
        }
    }

    public async Task<string> SendMessageAsync(string message)
    {
        // Use the existing ChatGPT API to generate a response
        ChatGPTClient chatGPTClient = new ChatGPTClient("your_api_key_here");
        string response = await chatGPTClient.SendMessageAsync(message);

        return response;
    }
}
```

3.Use the DiscordChatBot class in the Program class to handle Discord interactions. Here's an example:

```
class Program
{
    static void Main(string[] args)
    {
        // Rependpoint
        _client = new RestClient("https://api.openai.com/v1/engines/text-davinci-003/completions");

        // Create a Discord bot instance
        DiscordChatBot discordBot = new DiscordChatBot("your_discord_token_here");

        // ... (handle user input as before)
    }

    // ... (existing code)
}
```
This is just an example, but you can use a similar approach to add other messaging platforms or chatbot capabilities to the c-chat project.
