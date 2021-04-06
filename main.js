async function start(){
  try {
       
    const footer1 = document.getElementById("footer-1");
    footer1.style.display = "none";
    const artist = document.getElementById("artist").value;
    const song = document.getElementById("song").value;   

    let artistStr = "";
    let songStr = "";

    for (let i = 0; i < artist.length; i++) {
      artistStr += artist[i].replace(" ", '-');
    }

    for (let i = 0; i < song.length; i++) {
      songStr += song[i].replace(" ", '-');
    }
    
    const response = await fetch(`https://api.lyrics.ovh/v1/${artistStr}/${songStr}`);
    const data = await response.json();
    
    let str = data.lyrics;
    createLyrics(str);

  } catch (e) {
    console.log("There was a problem fetching the lyrics of the song");
  } 

}

function createLyrics(song){
  let lyrics = document.getElementById("lyrics");

  song = song.replace(/\r?\n|\r/g, " <br> ");
  let songTwo = song.split(" ");
  
  let songThree = "";  
  
  for (let i = 0; i < songTwo.length; i++){
    if (songTwo[i] == "<br>"){
      if (songTwo[i] == "<br>" && songTwo[i + 2] !== "<br>"){
        songTwo[i] = "<br><br>";        
      }
      if (songTwo[i] == "<br><br><br>" && songTwo[i - 2] == "<br>"){
        songTwo[i - 2] = "";                      
      }
      if (songTwo[i] == "<br><br>" && songTwo[i - 2] == "<br>"){
        songTwo[i - 2] = "";                      
      }      
    }     
  }  
  console.log(songTwo);

  songThree = songTwo.toString();
  let four = songThree.replace(/,/g, " ");
  lyrics.innerHTML = four; 
  const footer2 = document.getElementById("footer-2");
  footer2.style.display = "block";
  document.getElementById("artist").focus();  
}

