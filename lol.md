 <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard 
                icon={Zap} 
                title="Lightning Fast" 
                description="Set up your project in seconds, not minutes."
              />
              <FeatureCard 
                icon={Code} 
                title="Custom Templates" 
                description="Choose from a variety of pre-configured setups."
              />
              <FeatureCard 
                icon={Server} 
                title="API Ready" 
                description="RESTful routes and middleware, pre-configured."
              />
              <FeatureCard 
                icon={Database} 
                title="Database Integration" 
                description="Easy setup for popular databases."
              />
            </div>
          </motion.div>