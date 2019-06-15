<script>
  import { onMount, beforeUpdate, afterUpdate } from "svelte";

  let div;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  onMount(()=> {
      let sentence = sentences[0]
      say(sentence.text, sentence.speed, sentence.voice)
  })

  let PlaySpeed = {
    normal: "normal",
    slow: "slow",
    verySlow: "verySlow"
  };

  let Voices = {
    jaF1: "jaF1",
    jaF2: "jaF2",
    jaM1: "jaM1",
    jaM2: "jaM2"
  };

  let sentences = [
    { text: "こんにちは、ともさん", speed: PlaySpeed.slow, voice: Voices.jaM1 },
    { text: "今日はいい天気ですね", speed: PlaySpeed.slow, voice: Voices.jaF1 },
    { text: "そうですね。", speed: PlaySpeed.slow, voice: Voices.jaM1 },
    { text: "じゃあ、またね。", speed: PlaySpeed.slow, voice: Voices.jaF1 }
  ];

  let comments = [
    { author: "teacher", text: sentences[0].text },
    { author: "student", text: sentences[1].text },
    { author: "teacher", text: sentences[2].text },
    { author: "student", text: sentences[3].text }
  ];

  function getMS() {
    return new Date().getTime();
  }

  async function say(text, speed, voice) {
    var startMS = getMS();
    var response = await fetch(
      `/tts?text=${text}&speed=${speed}&voice=${voice}`
    ).then(res => res.text());

    const audio = new Audio("data:audio/wav;base64," + response);
    let promise = new Promise(function(resolve, reject) {
      audio.onended = () => {
        resolve(getMS() - startMS);
      };
    });
    audio.play();
    return promise;
  }
</script>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 400px;
    max-width: 240px;
    border: 1px solid #eee;
    margin: 0px auto;
  }

  .scrollable {
    flex: 1 1 auto;
    margin: 0 0.5em;
    overflow-y: auto;
  }

  article {
    margin: 0.5em 0;
  }

  .student {
    text-align: right;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  .teacher span {
    background-color: #eee;
    border-radius: 1em 1em 1em 0;
  }

  .student span {
    background-color: #0074d9;
    color: white;
    border-radius: 1em 1em 0 1em;
  }
</style>

<div class="chat">
  <div class="scrollable" bind:this={div}>
    {#each comments as comment}
      <article class={comment.author}>
        <span>{comment.text}</span>
      </article>
    {/each}
  </div>
</div>
