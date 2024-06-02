from flask import Flask, request, jsonify
import pymongo
from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext

app = Flask(__name__)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["farmclicker"]
players = db["players"]

TOKEN = '6820674346:AAHUAO-7ezVljuKloGz8lALq8XaMdvf7Z2w'

def save_player_data(player_id, data):
    players.update_one({"player_id": player_id}, {"$set": data}, upsert=True)

def get_player_data(player_id):
    return players.find_one({"player_id": player_id})

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    player_id = request.args.get('player_id')
    save_player_data(player_id, data)
    return jsonify({"status": "success"}), 200

def start(update: Update, context: CallbackContext) -> None:
    player_id = update.message.chat_id
    if not get_player_data(player_id):
        save_player_data(player_id, {
            'currentBalance': 0,
            'harvestPerClick': 1,
            'siloStorage': 0,
            'maxStorage': 0
        })
    update.message.reply_text('Welcome to FarmClicker!')

def click(update: Update, context: CallbackContext) -> None:
    player_id = update.message.chat_id
    player_data = get_player_data(player_id)
    
    if player_data:
        current_balance = player_data['currentBalance']
        silo_storage = player_data['siloStorage']
        max_storage = player_data['maxStorage']
        harvest_per_click = player_data['harvestPerClick']
        
        if silo_storage < max_storage:
            current_balance += harvest_per_click
            silo_storage += harvest_per_click
            save_player_data(player_id, {
                'currentBalance': current_balance,
                'harvestPerClick': harvest_per_click,
                'siloStorage': silo_storage,
                'maxStorage': max_storage
            })
            update.message.reply_text(f'You clicked! Current balance: {current_balance}')
        else:
            update.message.reply_text('Silo is full!')
    else:
        update.message.reply_text('Start a new game with /start')

def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("click", click))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
    app.run(host='0.0.0.0', port=5000)
