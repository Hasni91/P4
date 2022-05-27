class P4 {
    constructor(divGame, col = 7, lg = 6, color0, color1) {
        this.divGame = divGame;
        this.clor1 = color1;
        this.clor0 = color0;
        this.col = col;
        this.lg = lg;
        this.id = 0;
        
        this.joueur0 = 0;
        this.joueur1 = 0;
        
        if (this.clor1 == this.clor0) {
            this.clor0 = "yellow";
            $("#couleur0")[0].value = "yellow";
            this.clor1 = "red";
            $("#couleur1")[0].value = "red";
            alert("Les deux joueurs ne peuvent pas avoir des couleurs identiques.");
        }
        this.Game();
        this.Click();
    }
    
    Game() {
        const game = $(this.divGame);
        for (let lgn = 0; lgn < this.lg; lgn++) {
            var $lgn = $("<tr>").addClass("lgn");
            
            for (let col = 0; col < this.col; col++) {
                const $col = $("<th>").addClass("col vide").attr("data_col", col).attr("data_lgn", lgn);
                $lgn.append($col);
            }
            game.append($lgn);
        }
    }
    
    Click() {
        const divGame = $(this.divGame);
        var that = this;
        
        divGame.on("mouseup", ".col",(e)=>{
            let val = e.target.attributes.data_col.value;
            for(let i = that.lg - 1; i >= 0; i--){
                if($("[data_lgn=" + i + "][data_col=" + val + "]").hasClass("vide")){
                    divGame.cursor = "pointer";
                    $("[data_lgn=" + i + "][data_col=" + val + "]").removeClass("vide");
                    if(that.id == 1){
                        $("#tour").html("Au tour de joueur 0 avec les " + that.clor0);
                        $("[data_lgn=" + i + "][data_col=" + val + "]").attr("id", "1");
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": that.clor1, 'opacity': '1' });
                        that.win(i,val, that.id);
                        that.id = 0;
                    }else{
                        $("#tour").html("Au tour de joueur 1 avec les " + that.clor1);
                        $("[data_lgn=" + i + "][data_col=" + val + "]").attr("id", "0");
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": that.clor0, 'opacity': '1' });
                        that.win(i, val, that.id);
                        that.id = 1;
                    }
                    
                    ligne = i;
                    column = val.value;
                    return 0;
                }
            }
        })
        
        divGame.on("mouseleave", ".col",(e)=>{
            let val = e.target.attributes.data_col.value;
            for(let i = that.lg - 1; i >= 0; i--){
                if($("[data_lgn=" + i + "][data_col=" + val + "]").hasClass("vide")){
                    if(that.id == 1){
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": 'darkblue', 'opacity': '1' });
                    }else{
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": "darkblue", 'opacity': '1' });
                    }
                    return 0;
                }
            }
        })
        
        divGame.on("mouseenter", ".col",(e)=>{
            let val = e.target.attributes.data_col.value;
            for(let i = that.lg - 1; i >= 0; i--){
                if($("[data_lgn=" + i + "][data_col=" + val + "]").hasClass("vide")){
                    if(that.id == 1){
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": that.clor1, 'opacity': '0.6' });
                    }else{
                        $("[data_lgn=" + i + "][data_col=" + val + "]").css({ "background-color": that.clor0, 'opacity': '0.6' });
                    }
                    return 0;
                }
            }
        })
    }
    
    win(i, j, id){
        let won, draw;
        let that = this;
        let count = -1;
        let vectX = j;
        let vectY = i;
        
        
        //Horizontale

        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectX++;
        }
        vectX = j;
        
        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectX--;
        }
        if(count >= 4){
            won = true;
        }
        
        count = -1;
        vectX = j;
        
        
        //Verticale

        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectY++;
        }
        vectY = i;
        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectY--;
        }
        if(count >= 4) {
            won = true;
        }
        count = -1;
        vectY = i;
        
        
        //Première bisectrice

        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectY++;
            vectX++;
        }
        vectY = i;
        vectX = j;
        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectX--;
            vectY--;
        }
        if(count >= 4){
            won = true;
        }
        count = -1;
        vectX = j;
        vectY = i;
        
        
        //seconde bisectrice

        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectY--;
            vectX++;
        }
        vectY = i;
        vectX = j;
        while(vectY >= 0 && vectY < that.lg && vectX >= 0 && vectX < that.col && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id){
            count = count + 1;
            vectX--;
            vectY++;
        }

        if(count >= 4){
            won = true;
        }
        vectX = j;
        vectY = i;
        
        if(!$(".col").hasClass("vide")){
            won = true;
            draw = true;
        }
        
        if(won == true){
            $("#p4").off("mouseup");
            $("button").removeAttr("disabled");
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
            $("#tour").hide();
            if (!draw){
                alert("Joueur "+id+" remporte la manche");
                if(id == 1){
                    that.joueur1++;
                }else{
                    that.joueur0++;
                }
            }else{
                alert("Match nul")
            }
            $("#score").html(that.joueur0 + "/" + that.joueur1);
            $("#score").show();
            return true;
        }
        return false;
    }
}


$(".start").on("click", function(){
    $("button").attr("disabled","disabled");
    $("input").attr("disabled","disabled");
    $("select").attr("disabled","disabled");
    $("#tour").show();
    $("#score").hide();
    let p4 = new P4("#p4", $("#X")[0].value, $("#Y")[0].value, $("#couleur0")[0].value, $("#couleur1")[0].value);
});