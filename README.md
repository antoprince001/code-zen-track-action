# Code Zen Track Action

A Github action that responds with jokes, motivational quotes or any advice from your favourite character using GPT API leveraging the Github API to analyze the developer's GitHub history. This can be really helpful for developers to maintain their code zen by providing helpful suggestions to help them avoid burnout and frustration.

It aims to prioritise mental health and provide tailored prompts and responses to empower developers in their journey towards better well-being, productivity, and overall satisfaction.

## Background

Developers tend to be highly invested in their work at times and forget to take occasional breaks or get anxious over a lot of things. It could be maybe if a ci/cd pipeline keeps failing or they feel their github contributions are not getting appreciated. Feeling under appreciated might make the devs lose their motivation. So similar to apps that remind devs to take a break, this github action can provide suggestions based on the user github history and be scheduled to trigger in periodic intervals and create an issue in the repo ! But instead of just receiving a generic recommendation, you can set the words to follow the pattern of your favorite character , set the tone and define whether you want some wise words or a joke or even just honest opinion 

The actions takes the following inputs to engineer the right prompt and response
  
  #### Action Input
  
  - persona (x character from y show)
  
  - github-input (Type of data to be fetched from Github API (issues, repos, commits, PRs, contributions))
  
  - action (Judge, Joke, Quote, one liner, advice, reminder)

  - tone (Sarcastic, Jovial, Friendly)

  - contribution-period (in days)

  - output-length (Set length of the output response in words less than 128)
 
 #### Action Output
  
 - prompt

 - response


## Usage

The action needs OpenAI API KEY and Github API Keyto be set in the environment to run !

```yaml
      - uses: antoprince001/code-zen-track-action@v1.1.0
        id: prompt
        with:
          persona: "Batman DC Comics"
          github-input: "contributions"
          action: "judge"
          tone: "helpful"
          contribution-period: 15
          output-length: 50
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          API_GITHUB_TOKEN: ${{ secrets.API_GITHUB_TOKEN }}
      
      - name: Create an issue
        uses: actions-ecosystem/action-create-issue@v1
        with:
          github_token: ${{ secrets.API_GITHUB_TOKEN }}
          title: ✨Code Zen Tracking Prompt✨
          body: |
            We understand the significance of maintaining a state of code zen and fostering a healthy coding mindset.  😊✨ 
            To support you in this endeavor, we've generated a personalized prompt using GPT (a language model) to help you track and enhance your code zen. 
            🚀🎨
            
            #### GPT Response: ✨🙌
            ${{ steps.prompt.outputs.response }}
            
            We encourage you to reflect on this response and consider incorporating it into your coding routine. Embracing code zen can lead to improved focus, creativity, and efficiency in your programming tasks.
            
            Remember to take regular breaks, practice self-care, and maintain a growth mindset throughout your coding journey. 
            
            Wishing you a harmonious coding experience 🌟💻✨

          labels: |
            code-zen
```

## Contributors
Special mention to the contributors for this application 
[Hemanth Kumar](https://github.com/Hemanthhari2000) & [Sharmila S](https://github.com/SharmilaS22)
