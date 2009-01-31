load 'deploy' if respond_to?(:namespace) # cap2 differentiator

set :application, "s3radio"
set :deploy_to, "/opt/capistrano/#{application}"

set :scm, :git
set :repository, "/opt/git/repositories/#{application}.git"
set :local_repository, "#{File.dirname(__FILE__)}/"
# set :repository, "ssh://git@localhost:2222:iamnear.git"
set :branch, "master"
# set :repository_cache, "git_cache"
# set :deploy_via, :remote_cache
set :group_writable, false

set :user, "rails"
set :group, "rails"
set :use_sudo, false

set :location, "kusanagi.tomtaylor.co.uk"
set :port, "2222"
set :ssh_options, { :forward_agent => true }

role :app, location
role :web, location
role :db,  location, :primary => true

namespace :deploy do
  desc "Restart Application"
  task :restart do
    run "touch #{current_path}/tmp/restart.txt"
  end
  
  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with mod_rails"
    task t, :roles => :app do ; end
  end
  
  # adjusted finalize_update, removed non rails stuff
  task :finalize_update, :except => { :no_release => true } do
    sudo "chmod -R g+w #{latest_release}" if fetch(:group_writable, true)
  end
  
end