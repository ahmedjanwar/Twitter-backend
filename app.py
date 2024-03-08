from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from flask_wtf import FlaskForm

from config import Config
from models import User, Follow, Post, Comment
from forms import LoginForm

app = Flask(__name__)
app.config.from_object(Config)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(int(user_id))

@app.route('/')
@login_required
def home():
  following_ids = [user.following.id for user in current_user.following]
  posts = Post.query.filter(Post.user_id.in_(following_ids)).order_by(Post.created_at.desc())
  return render_template('home.html', posts=posts)

@app.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  if form.validate_on_submit():
    user = User.query.filter_by(username=form.username.data).first()
    if user and check_password_hash(user.password, form.password.data):
      login_user(user)
      return redirect(url_for('home'))
    flash('Invalid username or password.')
  return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
  logout_user()
  return redirect(url_for('login'))

if __name__ == '__main__':
  app.run(debug=True)
