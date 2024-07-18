
## Response

Automatic speech recognition responses return both a single string `text` property with the audio transcription and an optional array of `words` with start and end timestamps if the model supports that.

Here's an example of the output from the `@cf/openai/whisper` model:

```json
{
  "text": "It is a good day",
  "word_count": 5,
  "words": [
    {
      "word": "It",
      "start": 0.5600000023841858,
      "end": 1
    },
    {
      "word": "is",
      "start": 1,
      "end": 1.100000023841858
    },
    {
      "word": "a",
      "start": 1.100000023841858,
      "end": 1.2200000286102295
    },
    {
      "word": "good",
      "start": 1.2200000286102295,
      "end": 1.3200000524520874
    },
    {
      "word": "day",
      "start": 1.3200000524520874,
      "end": 1.4600000381469727
    }
  ]
}
```
