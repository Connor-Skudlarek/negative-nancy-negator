# negative-nancy-negator
## Brief description
This project is an Automated Content Alignment Regulator (ACAR). It is meant to reduce highly-engaging but undesired content on users' social media feeds, and better align social media recommendation algorithms to the content you actually want rather than what gets maximum engagement.

Scroll down if you just want instructions on how to start using it.

## Plan for the project
Basically, I find folks (myself being no exception) getting in "internet arguments" too often. I view that as a negative experience. That's not fun, in fact it is irritating explaining why we know the Earth is flat for the 37th time. Social media algorithms just sees, `"Engagement number go up, give him more!` It kills the 'social' part in social media.

## What this does NOT do
This extension does **NOT** stop you from engaging with content and people. Unlike others, it is NOT meant to block that content. It only exists to help YOU align the algorithm with the content you truly want to engage with.

It does this giving you a small 'nudge' to maybe not finish your comment. A quick check-in to help you ask, "Do I really care this much?" Which might get you away from the computer. Touch some grass, even if only in a game like Stardew Valley. Or just engage with other content you DO want to see more of in the future.

## Privacy concerns
The initial plan for this is to use only client-side scripting and information: no data sent over the net to some random person or company. Just your PC.

For now the focus is simply to handle analyzing text input to some select social media websites. Specifically to determine if what the user is typing appears to be a negative response to 'something else'.

Since this extension doesn't know the context, it won't know if you're talking to family or a stranger, if it is on your own Facebook feed or someone else's Reddit post. The first model will not be using any context clues.

No big data LLM companies. Just you and your writing.

## Usage
To run this, simply navigate to the project root on your computer after downloading (and extracting), then:

`npm install`
`npm run build`

Search `chrome://extensions` and enable "developer mode", then select "Load unpacked" and choose the directory where you have the project.
