from flask import Flask, render_template, request, redirect, url_for
from db import init, getTemporada, getEpisodios, setEstadoEp, reservaEpisodios, reservar, eliminarReserva

app = Flask(__name__, template_folder='templates')


init()


@app.route('/')
def index():
    seasons = getTemporada()
    episodes_list = getEpisodios(1)
    return render_template('./episodes.html', currentSeason=1, seasons=seasons, episodes=episodes_list)


@app.route("/allow/<season>/<number>")
def allow(season, number):
    setEstadoEp(number, "Available")
    eliminarReserva(number)
    return redirect(url_for('episodes', season=season))


@app.route("/rent/<season>/<number>")
def rent(season, number):
    setEstadoEp(number, "Rented")
    eliminarReserva(number)
    return redirect(url_for('episodes', season=season))


@app.route("/reserve/<season>/<number>")
def reserve(season, number):
    setEstadoEp(number, "Reserved")
    reservar(number)
    return redirect(url_for('episodes', season=season))


@app.route("/confirm_payment")
def confirmPayment():
    reserved_episodes = reservaEpisodios()
    return render_template('./confirm_payment.html', episodes=reserved_episodes)


@app.route("/payment_confirmed", methods=['POST'])
def paymentConfirmed():
    if request.method == "POST":
        episode_number = request.form["episode"]
        setEstadoEp(episode_number, "Rented")
        eliminarReserva(episode_number)
        return redirect(url_for('confirmPayment'))



if __name__ == "__main__":
    app.run(host="localhost", port="5000", debug=True)
